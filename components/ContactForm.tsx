"use client";

import { useForm, ValidationError } from "@formspree/react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mnjyylyb");

  if (state.succeeded) {
    return (
      <div className="cf-success">
        <div className="cf-success__icon">✓</div>
        <h3>Message received!</h3>
        <p>
          Thank you for reaching out. I typically respond within 24 hours on
          business days.
        </p>
      </div>
    );
  }

  return (
    <form className="cf-form" onSubmit={handleSubmit} noValidate>
      {/* Name row */}
      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="John"
            required
          />
          <ValidationError
            field="firstName"
            errors={state.errors}
            className="cf-error"
          />
        </div>
        <div className="cf-field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Doe"
            required
          />
          <ValidationError
            field="lastName"
            errors={state.errors}
            className="cf-error"
          />
        </div>
      </div>

      {/* Email + Phone row */}
      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="john@example.com"
            required
          />
          <ValidationError
            field="email"
            errors={state.errors}
            className="cf-error"
          />
        </div>
        <div className="cf-field">
          <label htmlFor="phone">
            Phone <span className="cf-optional">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Service */}
      <div className="cf-field">
        <label htmlFor="service">What can I help you with?</label>
        <select id="service" name="service" required>
          <option value="" disabled>
            Select a service...
          </option>
          <option value="web-design">Website Design</option>
          <option value="web-development">Website Development</option>
          <option value="wordpress">WordPress Development</option>
          <option value="headless">Headless / Next.js</option>
          <option value="seo">Search Engine Optimization</option>
          <option value="maintenance">Website Maintenance</option>
          <option value="other">Other / Not sure yet</option>
        </select>
        <ValidationError
          field="service"
          errors={state.errors}
          className="cf-error"
        />
      </div>

      {/* Budget */}
      <div className="cf-field">
        <label>Budget range</label>
        <div className="cf-budget-grid">
          {[
            { value: "under-500", label: "Under $500" },
            { value: "500-1500", label: "$500 – $1,500" },
            { value: "1500-5000", label: "$1,500 – $5,000" },
            { value: "5000-plus", label: "$5,000+" },
          ].map((b) => (
            <label key={b.value} className="cf-budget-option">
              <input type="radio" name="budget" value={b.value} required />
              <span>{b.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="cf-field">
        <label htmlFor="message">Tell me about your project</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Describe your project, goals, timeline, or anything else you'd like me to know..."
          required
        />
        <ValidationError
          field="message"
          errors={state.errors}
          className="cf-error"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary cf-submit"
        disabled={state.submitting}
      >
        {state.submitting ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
