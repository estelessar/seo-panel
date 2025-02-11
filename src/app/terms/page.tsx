export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <div className="prose">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Terms</h2>
        <p>By accessing our service, you agree to be bound by these terms of service and comply with all applicable laws and regulations.</p>

        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily access our services for personal, non-commercial use only.</p>

        <h2>3. Disclaimer</h2>
        <p>Our services are provided "as is". We make no warranties, expressed or implied, and hereby disclaim all warranties of any kind.</p>

        <h2>4. Limitations</h2>
        <p>In no event shall we be liable for any damages arising out of the use or inability to use our services.</p>

        <h2>5. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p>Email: bilisimadn@gmail.com</p>
      </div>
    </div>
  );
}
