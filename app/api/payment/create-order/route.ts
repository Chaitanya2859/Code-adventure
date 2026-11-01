import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_API_KEY || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_SECRET || process.env.RAZORPAY_SECRET_KEY;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured in environment variables');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

export async function POST(req: NextRequest) {
  try {
    const authUser = await getSession();
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planName, price } = await req.json();

    if (!price || !planName) {
      return NextResponse.json({ error: 'Missing price or planName' }, { status: 400 });
    }

    const options = {
      amount: price * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
