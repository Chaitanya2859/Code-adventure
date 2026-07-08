'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('/api/auth/signin', form);
      toast.success('Welcome back!');
      router.push(redirect);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Sign in failed. Please try again.');
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
          <h2 className="font-game text-3xl text-white mb-2 text-center">Welcome Back!</h2>
          <p className="text-zinc-500 text-center mb-8 font-game text-lg">Sign in to continue your adventure</p>

          {error && (
            <div className="bg-red-950 border border-red-700 text-red-400 rounded-lg px-4 py-3 mb-6 font-game text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-game text-zinc-400 text-lg mb-2">Email</label>
              <input
                id="signin-email"
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
                id="signin-password"
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-lg px-4 py-3 text-white font-game text-lg placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <button
              id="signin-submit"
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-6 font-game text-xl bg-yellow-400 text-black rounded-lg border-2 border-yellow-600 shadow-[4px_4px_0px_#ca8a04] hover:shadow-[2px_2px_0px_#ca8a04] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Signing In...' : '▶ Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="font-game text-zinc-500 text-lg">
              No account yet?{' '}
              <Link href="/sign-up" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                Create one →
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 font-game text-zinc-700 text-sm">
          🔒 Secure login — your data is protected
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
