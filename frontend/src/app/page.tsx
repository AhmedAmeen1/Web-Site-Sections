"use client";

import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionCard from "../components/SectionCard";
import Stats from "../components/Stats";

interface Section {
  _id: string;
  type: string;
  content: string;
}

export default function Home() {
  const [idea, setIdea] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setIsSubmitted(false);
    
    try {
      // POST the idea to the backend
      const postResponse = await fetch("http://localhost:3001/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!postResponse.ok) {
        throw new Error("Failed to submit idea");
      }

      // Fetch the stored sections
      const getResponse = await fetch("http://localhost:3001/sections");
      if (!getResponse.ok) {
        throw new Error("Failed to fetch sections");
      }
      
      const data = await getResponse.json();
      setSections(data);
      setIsSubmitted(true);
      
      // Scroll to sections after generation
      setTimeout(() => {
        document.getElementById('sections')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 500);
    } catch (err) {
      setError("Something went wrong! Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(sections, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-sections.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateMore = () => {
    setSections([]);
    setIsSubmitted(false);
    setError("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-sm"></div>
              <span className="text-xl font-bold text-black">Stunning</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-black hover:text-gray-600 transition-colors">Templates</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">Features</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">Pricing</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors">Help</a>
            </nav>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Create Stunning Websites in Minutes
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Leverage the power of AI to build professional, responsive websites effortlessly. No coding required.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Form Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-black mb-6 text-center">
              Generate Website Sections
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Describe your website idea and we'll generate beautiful, structured sections for your project.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="idea" className="block text-sm font-semibold text-gray-700 mb-2">
                  Describe your website idea
                </label>
                <textarea
                  id="idea"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., Landing page for a modern bakery with online ordering and delivery services"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={3}
                  required
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Be specific about your business type, target audience, and key features
                </p>
              </div>
              
              <button
                type="submit"
                disabled={loading || !idea.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200"
              >
                {loading ? (
                  <LoadingSpinner size="sm" color="white" text="Generating sections..." />
                ) : (
                  "Generate Website Sections"
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        {(loading || sections.length > 0) && (
          <div className="max-w-4xl mx-auto mb-16">
            <Stats sectionsCount={sections.length} isGenerating={loading} />
          </div>
        )}

        {/* Sections Preview */}
        {sections.length > 0 && (
          <div id="sections" className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">
                Generated Sections
              </h2>
              <p className="text-gray-600">
                Here are the sections for your website idea
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section, index) => (
                <SectionCard
                  key={section._id}
                  section={section}
                  index={index}
                  isSubmitted={isSubmitted}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <button 
                onClick={handleExport}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                📥 Export as JSON
              </button>
              <button 
                onClick={handleGenerateMore}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                🔄 Generate More Sections
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && sections.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Ready to create your website?
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter your website idea above and we'll generate beautiful, structured sections for your project.
            </p>
          </div>
        )}

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-black text-center mb-4">
            Key Features
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Stunning offers a range of powerful features to help you build and manage your website effectively.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">AI-Powered Design</h3>
              <p className="text-gray-600">Our AI algorithms generate unique website designs based on your preferences.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🖱️</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Drag & Drop Editor</h3>
              <p className="text-gray-600">Easily customize your website with our intuitive drag-and-drop editor.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Responsive Design</h3>
              <p className="text-gray-600">Ensure your website looks great on all devices with automatic responsive design.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied users and create your stunning website today.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Stunning. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Contact</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
