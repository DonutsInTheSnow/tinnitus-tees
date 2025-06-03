export default function PrivacyPolicy() {
  return (
    <main className="mt-2.5 p-8 max-w-6xl mx-auto text-red-950" style={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '15px' }}>
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <section className="space-y-4">
        <p>Last updated: May 19, 2025</p>
        <p>
          Tinnitus Tees values your privacy. This policy explains how we collect, use, and protect your information when you use our website.
        </p>
        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <p>
          We collect your email and payment details during checkout via Stripe. We do not store payment information; it&apos;s securely handled by Stripe.
        </p>
        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
        <p>
          Your data is used to process orders, send confirmations, and improve our services. We do not share your information with third parties except as needed for order fulfillment.
        </p>
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          For privacy concerns, email us at contact@tinnitustees.com or call (845) 555-1234.
        </p>
      </section>
    </main>
  );
}