import React from 'react';

interface ContactProps {
  contact: {
    name: string;
    role: string;
    phone: string;
    email: string;
    location: string;
    available: boolean;
  };
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>>;
  handleContactSubmit: (e: React.FormEvent) => void;
  formStatus: string;
}

export const Contact: React.FC<ContactProps> = ({
  contact,
  formData,
  setFormData,
  handleContactSubmit,
  formStatus,
}) => {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-6">
          <span className="text-white/40 text-sm">05 //</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">CONTACT</h2>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>
        <div className="reveal text-sm text-white/50 mb-12">
          // let's build something together
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="code-block p-6 mb-6">
              <div className="text-xs text-white/40 mb-4">// contact_info.json</div>
              <pre className="text-sm leading-loose text-white/80">{`{
  "name": "${contact.name}",
  "role": "${contact.role}",
  "phone": "${contact.phone}",
  "email": "${contact.email}",
  "location": "${contact.location}",
  "available": ${contact.available}
}`}</pre>
            </div>

            <div className="space-y-4">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 border border-white/10 p-4 hover:border-white/40 transition-all group">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">✉</div>
                <div>
                  <div className="text-xs text-white/40">EMAIL</div>
                  <div className="text-sm">{contact.email}</div>
                </div>
              </a>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-4 border border-white/10 p-4 hover:border-white/40 transition-all group">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">☎</div>
                <div>
                  <div className="text-xs text-white/40">PHONE</div>
                  <div className="text-sm">{contact.phone}</div>
                </div>
              </a>
              <div className="flex items-center gap-4 border border-white/10 p-4">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center">📍</div>
                <div>
                  <div className="text-xs text-white/40">LOCATION</div>
                  <div className="text-sm">{contact.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal">
            <form onSubmit={handleContactSubmit} id="contactForm" className="space-y-4">
              <div>
                <label className="text-xs text-white/40 block mb-2">// your_name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2">// your_email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2">// subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2">// message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-white text-black py-3 text-sm font-medium hover:bg-white/90 transition-all flex items-center justify-center gap-2 group">
                SEND_MESSAGE
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              {formStatus && <div id="formStatus" className="text-xs text-center text-white/60 mt-2">{formStatus}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
