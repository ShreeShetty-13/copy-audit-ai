'use client'

import { ArrowRight, Zap, Target, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

const CopyAuditLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [landingPageUrl, setLandingPageUrl] = useState('')
  const [email, setEmail] = useState('')
  const [isAuditSubmitting, setIsAuditSubmitting] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmitProof = async () => {
    if (transactionId.length !== 12) {
      alert('Please enter a valid 12-digit UTR/Transaction ID')
      return
    }
    setIsSubmitting(true)
    // Simulate payment verification delay
    setTimeout(() => {
      setShowSubmissionForm(true)
      setTransactionId('')
      setIsSubmitting(false)
    }, 1200)
  }

  const handleRequestAudit = async () => {
    if (!landingPageUrl.trim() || !email.trim()) {
      alert('Please fill in all fields')
      return
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    setIsAuditSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xykljlrv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          url: landingPageUrl, 
          email: email,
          status: "Payment Proof Submitted"
        }),
      });

      if (response.ok) {
        setShowSuccessMessage(true)
        setLandingPageUrl('')
        setEmail('')
      } else {
        alert("Submission failed. Please try again or contact support.")
      }
    } catch (error) {
      alert("Network error. Please check your connection.")
    } finally {
      setIsAuditSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent via-accent/80 to-accent/60 flex items-center justify-center">
              <Zap className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              CopyAudit AI
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a href="#comparison" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <Button onClick={scrollToPricing} className="bg-accent hover:bg-accent/90 text-accent-foreground px-6" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
              ✨ Powered by Advanced AI
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Transform Your Copy<br />
            <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
              Into Conversion Gold
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop guessing. Our AI-powered audit reveals exactly what&apos;s killing your conversions and shows you the proven fixes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button onClick={scrollToPricing} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 px-8">
              Unlock Your Audit <ArrowRight className="w-5 h-5" />
            </Button>
            <Button onClick={() => setShowDemo(!showDemo)} size="lg" variant="outline" className="border-border text-foreground">
              {showDemo ? 'Hide Demo' : 'View Demo'}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-12 max-w-md mx-auto text-sm">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-accent">3K+</div>
              <div className="text-muted-foreground">Audits Run</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-accent">47%</div>
              <div className="text-muted-foreground">Avg. Lift</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-accent">500+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      {showDemo && (
        <section className="relative py-20 px-6 bg-secondary/20 transition-all animate-in fade-in slide-in-from-bottom-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold">Professional Audit Example</h2>
              <Button onClick={() => setShowDemo(false)} variant="ghost">Close</Button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-red-500">Before Audit</h3>
                <div className="bg-secondary/50 border border-border rounded-2xl p-6">
                  <p className="text-muted-foreground italic">&quot;Check out our app. It&apos;s really good and people like it. Download it now.&quot;</p>
                  <div className="mt-4 space-y-2 text-sm text-red-500/70">
                    <div>❌ Vague value proposition</div>
                    <div>❌ No urgency</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-accent">After Audit</h3>
                <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6">
                  <p className="font-medium">&quot;Save 12 hours per week. Join 500+ pros streamlining their workflow today.&quot;</p>
                  <div className="mt-4 space-y-2 text-sm text-accent">
                    <div>✓ Specific benefit</div>
                    <div>✓ Social proof</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Section */}
      <section id="comparison" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">See the Transformation</h2>
            <p className="text-muted-foreground">From bland and forgettable to compelling and conversion-focused</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-muted-foreground">Old Boring Copy</h3>
              <div className="bg-secondary/50 border border-border rounded-2xl p-8 h-64 flex items-center">
                <p className="text-muted-foreground">We offer great software solutions for businesses. Reliable products and many features to help you work better.</p>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-accent">New Growth Copy</h3>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-2xl p-8 h-64 flex items-center">
                <p className="font-medium">Stop losing 60% of leads to clunky workflows. Our AI cuts friction by 80%, letting your team close deals faster.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/Payment Section */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              {showSuccessMessage ? 'Audit Request Received!' : showSubmissionForm ? 'Submit Your Landing Page' : 'Ready to Transform Your Copy?'}
            </h2>
          </div>

          {showSuccessMessage ? (
            <div className="bg-accent/10 border-2 border-accent rounded-3xl p-12 text-center space-y-6">
              <Zap className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-3xl font-bold">Audit Received!</h3>
              <p>Your report will be sent to your email within 2 hours.</p>
              <Button onClick={() => { setShowSuccessMessage(false); setShowSubmissionForm(false); }} className="bg-accent">Start Over</Button>
            </div>
          ) : showSubmissionForm ? (
            <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl space-y-6 max-w-xl mx-auto">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-1 block">Landing Page URL</label>
                  <input type="url" value={landingPageUrl} onChange={(e) => setLandingPageUrl(e.target.value)} placeholder="https://example.com" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-accent outline-none" />
                </div>
                <Button onClick={handleRequestAudit} disabled={isAuditSubmitting} className="w-full bg-accent text-white py-6 text-lg">
                  {isAuditSubmitting ? 'Sending...' : 'Request My AI Audit'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white text-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-40 h-40 border-2 border-gray-200 rounded-2xl flex-shrink-0">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=shreeshetty03@okaxis" alt="UPI QR" className="p-2" />
                </div>
                <div className="text-center md:text-left space-y-2">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Total Investment</p>
                  <p className="text-5xl font-black text-gray-900">₹999</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">shreeshetty03@okaxis</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold block">Enter 12-digit UTR / Transaction ID</label>
                <input 
                  type="text" 
                  value={transactionId} 
                  onChange={(e) => setTransactionId(e.target.value.replace(/\D/g, '').slice(0, 12))} 
                  placeholder="0000 0000 0000" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-accent text-center text-xl tracking-widest outline-none" 
                />
                <Button 
                  onClick={handleSubmitProof} 
                  disabled={isSubmitting || transactionId.length !== 12} 
                  className="w-full bg-accent hover:bg-accent/90 py-6 text-lg text-white"
                >
                  {isSubmitting ? 'Verifying...' : 'Submit Payment Proof'}
                </Button>
                
                {/* Mobile Pay Link */}
                <a href="upi://pay?pa=shreeshetty03@okaxis&pn=Shree&am=999&cu=INR" className="block md:hidden text-center text-accent font-semibold underline py-2">
                  Open in UPI App
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 text-center">
        <p className="text-muted-foreground text-sm">&copy; 2026 CopyAudit AI. Transform your copy with precision.</p>
      </footer>
    </div>
  )
}

export default CopyAuditLanding