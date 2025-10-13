import React, { useMemo, useState } from 'react';

export default function Contact({ formspreeEndpoint } = {}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  const endpoint = formspreeEndpoint ?? 'https://formspree.io/f/xblzjorp';

  const isValid = useMemo(() => {
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const emailOk = /.+@.+\..+/.test(email);
    return trimmedName.length >= 2 && emailOk && trimmedMessage.length >= 10;
  }, [name, email, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isValid) {
      setError('Bitte fülle alle Felder korrekt aus.');
      return;
    }

    if (endpoint) {
      try {
        setStatus('sending');
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        if (!res.ok) throw new Error('Fehler beim Senden');
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } catch (err) {
        setStatus('error');
        setError('Senden fehlgeschlagen. Bitte später erneut versuchen.');
      }
      return;
    }

    // Mailto Fallback
    const subject = encodeURIComponent(`Kontaktanfrage von ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nNachricht:\n${message}`);
    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-16" id="contact-form">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-headingColor">Kontakt</h2>
          <p className="mt-3 text-textColor/90">Haben Sie Interesse an einer Zusammenarbeit? Schreiben Sie mir eine Nachricht.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-6 md:p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-headingColor" htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ihr Name"
                className="w-full rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-textColor dark:text-white/90 placeholder:text-textColor/60 dark:placeholder-white/40 px-3 py-2 outline-none focus:ring-2 focus:ring-secondary"
                required
                minLength={2}
                name="name"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-headingColor" htmlFor="contact-email">E-Mail</label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-textColor dark:text-white/90 placeholder:text-textColor/60 dark:placeholder-white/40 px-3 py-2 outline-none focus:ring-2 focus:ring-secondary"
                required
                name="email"
                autoComplete="email"
                inputMode="email"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1 text-headingColor" htmlFor="contact-message">Nachricht</label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Wie kann ich helfen?"
              className="w-full min-h-[160px] rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-800 text-textColor dark:text-white/90 placeholder:text-textColor/60 dark:placeholder-white/40 px-3 py-2 outline-none focus:ring-2 focus:ring-secondary"
              required
              minLength={10}
              name="message"
            />
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-500">{error}</div>
          )}
          {status === 'success' && (
            <div className="mt-4 text-sm text-green-500">Danke! Ihre Nachricht wurde gesendet.</div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="submit"
              disabled={!isValid || status === 'sending'}
              className="inline-flex items-center justify-center rounded-md bg-secondary px-5 py-2 font-medium text-black hover:bg-secondary/90 disabled:opacity-60 w-full sm:w-auto"
            >
              {status === 'sending' ? 'Senden…' : 'Nachricht senden'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
} 