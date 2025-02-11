export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <div className="prose">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect information that you provide directly to us when you use our services:</p>
        <ul>
          <li>Google account information for authentication</li>
          <li>Search Console and Analytics data</li>
          <li>Usage data and preferences</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Analyze your website performance</li>
          <li>Generate SEO reports and recommendations</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>We implement appropriate security measures to protect your data.</p>

        <h2>4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>Email: bilisimadn@gmail.com</p>
      </div>
    </div>
  );
}
