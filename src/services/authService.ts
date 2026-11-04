/**
 * Authentication and Administrative Authorization Service
 * Supports Firebase Authentication and secure local administrative session management.
 */

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'superadmin' | 'editor';
  lastLogin: string;
}

const AUTH_STORAGE_KEY = 'tcg_admin_session_v1';
const PROVISIONED_KEY = 'tcg_admin_provisioned_v1';

// Initial default admin setup token for first-time provisioning
// Can be customized via environment variable VITE_ADMIN_PROVISION_KEY
const DEFAULT_PROVISION_SECRET = 'TCG-ADMIN-2026-SETUP';

export const AuthService = {
  /**
   * Check if an admin is currently authenticated with a valid session
   */
  isAuthenticated(): boolean {
    const session = this.getSession();
    if (!session) return false;
    // Check if session expired (8 hours expiry)
    const sessionTime = new Date(session.lastLogin).getTime();
    const now = new Date().getTime();
    if (now - sessionTime > 8 * 60 * 60 * 1000) {
      this.logout();
      return false;
    }
    return true;
  },

  getSession(): AdminUser | null {
    try {
      const data = sessionStorage.getItem(AUTH_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  isProvisioned(): boolean {
    return localStorage.getItem(PROVISIONED_KEY) === 'true';
  },

  /**
   * Provision the initial administrator account securely
   */
  provisionAdmin(email: string, passwordHash: string, provisionKey: string): { success: boolean; message: string } {
    const validKey = import.meta.env.VITE_ADMIN_PROVISION_KEY || DEFAULT_PROVISION_SECRET;
    if (provisionKey.trim() !== validKey) {
      return { success: false, message: 'Invalid administrative provisioning key.' };
    }
    if (!email || !passwordHash || passwordHash.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    // Save admin credentials hash
    localStorage.setItem('tcg_admin_cred_email', email.trim().toLowerCase());
    localStorage.setItem('tcg_admin_cred_hash', passwordHash);
    localStorage.setItem(PROVISIONED_KEY, 'true');

    return { success: true, message: 'Administrator credentials successfully provisioned.' };
  },

  /**
   * Log in the administrator
   */
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: AdminUser }> {
    const trimmedEmail = email.trim().toLowerCase();

    // 1. If Firebase Auth is configured in environment, attempt Firebase sign-in
    // (Firebase integration point provided)
    if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== 'your_firebase_api_key_here') {
      try {
        // Firebase Auth REST API signInWithPassword
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: trimmedEmail, password, returnSecureToken: true }),
          }
        );
        const data = await response.json();
        if (response.ok && data.idToken) {
          const user: AdminUser = {
            uid: data.localId,
            email: data.email,
            displayName: 'Tushar Chand Gupta',
            role: 'superadmin',
            lastLogin: new Date().toISOString(),
          };
          sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
          return { success: true, message: 'Logged in via Firebase Auth', user };
        }
      } catch (err) {
        console.warn('Firebase login attempt failed, falling back to provisioned auth:', err);
      }
    }

    // 2. Provisioned / Local Admin Authentication
    const savedEmail = localStorage.getItem('tcg_admin_cred_email');
    const savedHash = localStorage.getItem('tcg_admin_cred_hash');

    // Default master admin account if not yet customized
    const defaultAdminEmail = 'tushar@tusharchandgupta.com';
    const defaultPassword = 'admin'; // Initial development key

    const isValidAdmin =
      (savedEmail ? trimmedEmail === savedEmail && password === savedHash : (trimmedEmail === defaultAdminEmail && password === defaultPassword) || (trimmedEmail === 'admin' && password === defaultPassword));

    if (isValidAdmin) {
      const user: AdminUser = {
        uid: 'adm-001',
        email: trimmedEmail,
        displayName: 'Tushar Chand Gupta (Admin)',
        role: 'superadmin',
        lastLogin: new Date().toISOString(),
      };
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return { success: true, message: 'Administrative authentication successful', user };
    }

    return { success: false, message: 'Invalid administrator email or password.' };
  },

  logout(): void {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  },
};

