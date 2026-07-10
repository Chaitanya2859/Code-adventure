import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

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

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
