import React, { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';


const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Sending message...');

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          toast.success('Message sent! I will get back to you soon.', {
            id: loadingToast,
          });
          form.current.reset();
        },
        (error) => {
          toast.error('Failed to send message. Please try again.', {
            id: loadingToast,
          });
          console.error('FAILED...', error.text);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <Toaster position="bottom-right" />
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Get in touch</h1>
        <p className="text-zinc-400">Have a question or want to work together? Drop me a message.</p>
      </div>

      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div className="grid gap-2">
           <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
           <input 
             type="text" 
             name="name"
             id="name" 
             required
             className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-zinc-600"
             placeholder="John Doe"
           />
        </div>
        <div className="grid gap-2">
           <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
           <input 
             type="email" 
             name="email"
             id="email" 
             required
             className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-zinc-600"
             placeholder="john@example.com"
           />
        </div>
        <div className="grid gap-2">
           <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
           <textarea 
             name="message"
             id="message" 
             rows={4}
             required
             className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-zinc-600 resize-none"
             placeholder="Tell me about your project..."
           />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
          {!isSubmitting && <Send size={16} />}
        </button>
      </form>
    </div>
  );
};

export default Contact;
