"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Er is een probleem opgetreden bij het versturen.");
      }

      setResponseMessage("Bedankt! Uw bericht is succesvol verzonden.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setResponseMessage(
        "Oeps! Er is iets misgegaan. Probeer het later opnieuw."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main id='main' className='space-y-8'>
      {/* Hero Section */}
      <section className='text-center py-12'>
        <h1 className='text-4xl font-bold mb-4'>Contact</h1>
        <p className='text-xl text-gray-600'>
          Heeft u vragen of suggesties? Neem gerust contact met ons op!
        </p>
      </section>

      {/* Contact Form */}
      <section className='container mx-auto px-6 md:px-12 lg:px-16 pb-16'>
        <div className='bg-white rounded-xl p-6 shadow-sm'>
          <h2 className='text-2xl font-bold mb-6'>Stuur ons een bericht</h2>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'>
                Naam
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
                className='mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                E-mail
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                className='mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg'
              />
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700'>
                Bericht
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className='mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg'
              />
            </div>

            <div className='flex justify-end mt-4'>
              <button
                type='submit'
                disabled={isLoading}
                className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl px-6 py-3 text-white shadow-lg flex items-center justify-center gap-2 
                  font-medium transition-all duration-150 transform ${
                    isLoading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "hover:bg-blue-700 hover:shadow-xl"
                  }`}>
                {isLoading ? (
                  <span className='flex items-center gap-2'>
                    <i className='fa-solid fa-circle-notch animate-spin'></i>
                    Versturen...
                  </span>
                ) : (
                  <>
                    <i className='fa-solid fa-paper-plane'></i>
                    Verstuur bericht
                  </>
                )}
              </button>
            </div>
          </form>

          {responseMessage && (
            <div
              className={`mt-6 p-4 rounded-lg text-sm ${
                responseMessage.includes("Bedankt")
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}>
              {responseMessage}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
