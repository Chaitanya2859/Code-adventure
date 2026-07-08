'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/auth/signup', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success('Account created! Welcome to the adventure!');
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Pixel art background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="/crown.png" alt="Logo" className="w-12 h-12" />
          <h1 className="font-game text-4xl text-white mt-2">Code Adventure</h1>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-8 shadow-2xl shadow-yellow-400/5">
          <h2 className="font-game text-3xl text-white mb-2 text-center">Start Your Quest!</h2>
          <p className="text-zinc-500 text-center mb-8 font-game text-lg">Create your hero profile</p>

          {error && (
            <div className="bg-red-950 border border-red-700 text-red-400 rounded-lg px-4 py-3 mb-6 font-game text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-game text-zinc-400 text-lg mb-2">Hero Name</label>
              <input
                id="signup-name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your full name"
                className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white font-game text-lg placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <div>
              <label className="block font-game text-zinc-400 text-lg mb-2">Email</label>
              <input
                id="signup-email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="hero@adventure.com"
                className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white font-game text-lg placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <div>
              <label className="block font-game text-zinc-400 text-lg mb-2">Password</label>
              <input
                id="signup-password"
                type="password"
                required
                autoComplete="new-password"
                minLength={6}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="At least 6 characters"
                className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white font-game text-lg placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <div>
              <label className="block font-game text-zinc-400 text-lg mb-2">Confirm Password</label>
              <input
                id="signup-confirm"
                type="password"
                required
                autoComplete="new-password"
                value={form.confirm}
                onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                placeholder="Repeat your password"
                className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white font-game text-lg placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-6 font-game text-xl bg-yellow-400 text-black rounded-lg border-2 border-yellow-600 shadow-[4px_4px_0px_#ca8a04] hover:shadow-[2px_2px_0px_#ca8a04] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Creating Account...' : '⚔️ Begin Adventure'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="font-game text-zinc-500 text-lg">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                Sign In →
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 font-game text-zinc-700 text-sm">
          🔒 Secure signup — your data is protected
        </p>
      </div>
    </div>
  );
}
