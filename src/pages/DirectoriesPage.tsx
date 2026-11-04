import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Building2,
  Search,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Clock,
  PlusCircle,
  X,
  Send,
  AlertCircle,
  Filter,
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { DirectoryListing } from '../types';

export const DirectoriesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCat = searchParams.get('cat') || 'All';

  const [search, setSearch] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCat, setFormCat] = useState<DirectoryListing['category']>('Electronics Companies');
  const [formCity, setFormCity] = useState('');
  const [formState, setFormState] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSpecs, setFormSpecs] = useState('');

  const categories = [
    'All',
    'Electronics Companies',
    'PCB Manufacturers',
    'PCB Designers',
    'Component Distributors',
    'Embedded & IoT',
  ];

  const listings = StorageService.getApprovedDirectories();

  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.city.toLowerCase().includes(search.toLowerCase()) ||
      item.specialization.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = currentCat === 'All' || item.category === currentCat;
    return matchesSearch && matchesCat;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionFeedback(null);

    if (!formName || !formCity || !formWebsite || !formDesc) {
      setSubmissionFeedback({ success: false, message: 'Please fill out all required fields.' });
      return;
    }

    try {
      StorageService.submitDirectory({
        name: formName.trim(),
        category: formCat,
        city: formCity.trim(),
        state: formState.trim() || 'India',
        country: 'India',
        location: `${formCity.trim()}, ${formState.trim() || 'India'}`,
        website: formWebsite.trim(),
        contactEmail: formEmail.trim() || undefined,
        description: formDesc.trim(),
        specialization: formSpecs
          ? formSpecs.split(',').map((s) => s.trim()).filter(Boolean)
          : ['Electronics Design', 'ESDM'],
      });

      setSubmissionFeedback({
        success: true,
        message: 'Your listing has been submitted for administrative review and moderation. It will be published upon verification.',
      });

      // Clear form
      setFormName('');
      setFormCity('');
      setFormState('');
      setFormWebsite('');
      setFormEmail('');
      setFormDesc('');
      setFormSpecs('');
    } catch (err: any) {
      setSubmissionFeedback({ success: false, message: 'Submission failed. Please try again.' });
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-3">
              <Building2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Industry & Service Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Electronics Industry Directories
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Curated database of Indian electronics manufacturers (ESDM), PCB layout bureaus, fabrication houses, and authorized distributors.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 text-white font-semibold text-xs sm:text-sm shadow-sm hover:bg-orange-700 active:scale-95 transition-all self-start sm:self-auto shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit a Listing</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by company, city, or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSearchParams(cat === 'All' ? {} : { cat })}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  currentCat === cat
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-medium text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60">
                    {item.category}
                  </span>
                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
                  {item.name}
                </h3>

                <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{item.location}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.specialization.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {item.contactEmail ? (
                  <a
                    href={`mailto:${item.contactEmail}`}
                    className="text-slate-500 hover:text-slate-800 truncate"
                  >
                    {item.contactEmail}
                  </a>
                ) : (
                  <span className="text-slate-400">Verified Listing</span>
                )}

                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-orange-600 hover:text-orange-700"
                >
                  <span>Visit Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Listing Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsSubmitModalOpen(false);
                setSubmissionFeedback(null);
              }}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Submit an Electronics Company / Service
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Listings undergo administrative moderation before being published. All verified details will be visible to the public.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Company / Bureau Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Apex High-Speed PCB Layout Labs"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Category *</label>
                <select
                  value={formCat}
                  onChange={(e) => setFormCat(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Electronics Companies">Electronics Companies</option>
                  <option value="PCB Manufacturers">PCB Manufacturers</option>
                  <option value="PCB Designers">PCB Designers</option>
                  <option value="Component Distributors">Component Distributors</option>
                  <option value="Embedded & IoT">Embedded & IoT</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="e.g. Bengaluru"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">State</label>
                  <input
                    type="text"
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    placeholder="e.g. Karnataka"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Official Website URL *</label>
                <input
                  type="url"
                  required
                  value={formWebsite}
                  onChange={(e) => setFormWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Direct Contact Email</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Short Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Summarize engineering capabilities, manufacturing scale, or CAD toolchains..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Specializations (comma separated)</label>
                <input
                  type="text"
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  placeholder="e.g. HDI Microvias, 14-Layer, Altium, SMT Assembly"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              {submissionFeedback && (
                <div
                  className={`p-3 rounded-xl flex items-center gap-2 text-xs ${
                    submissionFeedback.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submissionFeedback.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{submissionFeedback.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 active:scale-95 transition-all shadow-md shadow-orange-600/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit for Moderation</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

