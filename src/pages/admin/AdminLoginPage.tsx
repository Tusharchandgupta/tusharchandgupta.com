import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, KeyRound, ShieldCheck, AlertCircle, ArrowLeft, Cpu } from 'lucide-react';
import { AuthService } from '../../services/authService';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [provisionMode, setProvisionMode] = useState(false);
  const [provisionKey, setProvisionKey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await AuthService.login(email, password);
      setIsLoading(false);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Authentication error.');
    }
  };

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const res = AuthService.provisionAdmin(email, password, provisionKey);
    if (res.success) {
      setSuccess(res.message + ' You may now log in with your credentials.');
      setProvisionMode(false);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/30">
            <Lock className="w-6 h-6" />
          </div>
        </div>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Administrative Console
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Restricted access for platform management and content moderation
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-800 py-8 px-6 sm:px-10 rounded-3xl border border-slate-700 shadow-xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-900/40 border border-red-700/60 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/60 text-emerald-200 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {!provisionMode ? (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Administrator Email / Username
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tushar@tusharchandgupta.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 active:scale-95 transition-all shadow-md shadow-orange-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isLoading ? 'Verifying Credentials...' : 'Authenticate & Enter'}</span>
              </button>

              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <button
                  type="button"
                  onClick={() => {
                    setProvisionMode(true);
                    setError(null);
                  }}
                  className="hover:text-orange-400 underline"
                >
                  Provision Master Account
                </button>
                <Link to="/" className="hover:text-white flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  <span>Return to Website</span>
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleProvision} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-amber-900/30 border border-amber-700/50 text-amber-200 text-xs">
                <strong>Provisioning Mode:</strong> Enter the provisioning setup key (default: <code>TCG-ADMIN-2026-SETUP</code>) to establish administrator credentials.
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Provisioning Setup Secret
                </label>
                <input
                  type="password"
                  required
                  value={provisionKey}
                  onChange={(e) => setProvisionKey(e.target.value)}
                  placeholder="Enter setup key..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tushar@tusharchandgupta.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">
                  Set Master Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 text-white font-semibold text-xs hover:bg-orange-700 active:scale-95 transition-all"
                >
                  Complete Provisioning
                </button>
                <button
                  type="button"
                  onClick={() => setProvisionMode(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 text-slate-300 font-semibold text-xs hover:bg-slate-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

