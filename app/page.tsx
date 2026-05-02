'use client'

import { useState } from 'react'

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    {
      id: 'consultation',
      title: 'Online Consultation',
      description: 'Connect with healthcare professionals instantly',
      icon: '👨‍⚕️',
    },
    {
      id: 'prescription',
      title: 'Prescriptions',
      description: 'Get digital prescriptions delivered to your inbox',
      icon: '📋',
    },
    {
      id: 'records',
      title: 'Health Records',
      description: 'Access your complete medical history securely',
      icon: '📊',
    },
    {
      id: 'appointments',
      title: 'Book Appointments',
      description: 'Schedule appointments with ease',
      icon: '📅',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            <h1 className="text-xl font-bold text-gray-900">Healthbridge</h1>
          </div>
          <p className="text-sm text-gray-600 hidden sm:block">Making healthcare accessible</p>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Healthcare at Your <span className="text-primary">Fingertips</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Connect with doctors, access your health records, and manage your wellness journey all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary w-full sm:w-auto">
              Get Started
            </button>
            <button className="btn-secondary w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`card text-left transition-all duration-200 cursor-pointer group hover:shadow-card ${
                  selectedService === service.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-white/50">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Get in Touch
          </h3>
          <div className="card space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/your-number"
                className="btn-primary flex-1 text-center flex items-center justify-center gap-2"
              >
                <span>💬</span>
                WhatsApp
              </a>
              <a
                href="tel:+your-number"
                className="btn-secondary flex-1 text-center flex items-center justify-center gap-2"
              >
                <span>☎️</span>
                Call Us
              </a>
            </div>
            <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
              <p>Available 24/7 for your health concerns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <span>🏥</span>
                Healthbridge
              </h4>
              <p className="text-gray-400 text-sm">
                Making healthcare accessible to everyone, everywhere.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Services</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Healthbridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}