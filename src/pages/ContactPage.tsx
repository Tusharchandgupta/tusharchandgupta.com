import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Github, Linkedin, MessageSquare } from 'lucide-react';
import { StorageService } from '../services/storageService';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const result = StorageService.submitContactMessage({
      name,
      email,
      subject,
      message,
    });

    setIsSubmitting(false);
    setFeedback(result);
    if (result.success) {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5 text-orange-600" />
            <span>Connect & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Have a question regarding circuit calculations, PCB design review, laboratory simulation, or hardware collaboration? Send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Direct Inquiries</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Messages submitted through this verified portal are forwarded directly to Tushar Chand Gupta's administrative inbox.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                  <a href="mailto:contact@tusharchandgupta.com" className="font-semibold text-slate-800 hover:text-orange-600">
                    contact@tusharchandgupta.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                  <span className="font-semibold text-slate-800">New Delhi / NCR, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Open Source</span>
                  <a
                    href="https://github.com/Tusharchandgupta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-800 hover:text-orange-600"
                  >
                    github.com/Tusharchandgupta
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 text-xs text-orange-900">
              <strong>Response Time:</strong> Typically replies within 24 to 48 hours for technical reviews and academic inquiries.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              <span>Send a Technical Query</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ramesh@company.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Question regarding ESP32 pinout or PCB trace calculation"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your engineering question, calculation requirements, or collaboration scope..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {feedback && (
                <div
                  className={`p-3 rounded-xl flex items-center gap-2 text-xs ${
                    feedback.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {feedback.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 active:scale-95 transition-all shadow-md shadow-orange-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

