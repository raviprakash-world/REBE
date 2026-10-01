import { FREE_SHIPPING_THRESHOLD } from '@/services/deliveryService';
import imageCredits from '../../../api/prisma/demo/image-credits.json';
import { formatCurrency } from '@/utils/currency';

export interface PolicySection {
  heading: string;
  body: string;
}

export interface Policy {
  slug: string;
  title: string;
  updatedAt: string;
  sections: PolicySection[];
}

export const policies: Policy[] = [
  {
    slug: 'shipping',
    title: 'Shipping Policy',
    updatedAt: '2026-07-01',
    sections: [
      {
        heading: 'Processing time',
        body: 'Orders ship within 1–2 business days of being placed. You’ll get a shipping confirmation as soon as your order leaves our partner nursery or warehouse.',
      },
      {
        heading: 'Delivery estimates',
        body: 'Delivery windows depend on your PIN code — enter it at checkout or in your cart for an exact estimate. As a rough guide, most orders arrive within 2–6 business days.',
      },
      {
        heading: 'Free shipping threshold',
        body: `Orders over ${formatCurrency(FREE_SHIPPING_THRESHOLD)} ship free. Orders under that threshold are charged a flat rate based on your region, shown before you check out.`,
      },
      {
        heading: 'Plant-specific packaging',
        body: 'Live plants ship with internal bracing to keep soil and stems in place, plus breathable air holes — not sealed in plastic, which causes more damage than it prevents.',
      },
    ],
  },
  {
    slug: 'returns',
    title: 'Return Policy',
    updatedAt: '2026-07-01',
    sections: [
      {
        heading: 'Plants',
        body: 'Live plants are final sale once delivered, since they can’t be resold. They’re covered separately by our 30-day health guarantee: if a plant arrives unwell or dies within 30 days despite following the included care card, we replace it once at no charge.',
      },
      {
        heading: 'Vessels & tools',
        body: 'Vessels and tools can be returned within 14 days of delivery if unused, undamaged, and in original packaging. Contact us for a return authorization before sending anything back.',
      },
      {
        heading: 'Refund timing',
        body: 'Once we receive a return, refunds are issued to the original payment method within 5–7 business days.',
      },
      {
        heading: 'Damaged on arrival',
        body: 'If anything arrives damaged, photograph it within 48 hours and reach out through Contact — we’ll sort out a replacement or refund without asking you to ship it back first.',
      },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    updatedAt: '2026-10-01',
    sections: [
      {
        heading: 'What we collect',
        body: 'Name, email, phone number, shipping address, and order history when you place an order or create an account. If you contact us, we keep the message and our reply to resolve the request. We do not collect or store your card, UPI, or bank details — those are entered directly into our payment processor’s secure form and never touch our servers.',
      },
      {
        heading: 'How we use your data',
        body: 'To process and ship your order, send order and delivery updates, respond to support requests, and prevent fraud. We don’t use your data for anything beyond running the store and the purposes listed on this page.',
      },
      {
        heading: 'Who we share it with',
        body: 'We share only what’s needed to fulfil an order: your payment details with our payment processor (Razorpay) to complete the transaction, your name, address and phone with our shipping/courier partners to deliver it, and order details with transactional email/SMS providers to send you updates. We don’t sell your personal information, and we don’t share it for third-party advertising.',
      },
      {
        heading: 'Cookies',
        body: 'We use functional cookies for cart persistence and session state only — no third-party ad-tracking cookies.',
      },
      {
        heading: 'Data retention',
        body: 'We keep order records for as long as needed to meet tax, accounting and consumer-dispute requirements under Indian law, and account data until you ask us to delete it.',
      },
      {
        heading: 'Your rights',
        body: 'Under India’s Digital Personal Data Protection Act, 2023, you can ask us to let you access, correct, or erase your personal data, and you can withdraw consent for optional processing at any time. Send requests to the contact below; we’ll acknowledge within 48 hours and resolve within 30 days.',
      },
      {
        heading: 'Grievance Officer',
        body: '[Name] · [email] · [phone] · [registered address] — to be completed before this policy is relied on for live orders. Required under the IT Rules, 2021 and the Consumer Protection (E-Commerce) Rules, 2020.',
      },
      {
        heading: 'Governing law',
        body: 'This policy is governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts at [city, to be filled in once the business is registered].',
      },
      {
        heading: 'Draft status',
        body: 'This policy is a working draft prepared to cover the points Indian e-commerce law requires (DPDPA 2023, IT Rules 2021, Consumer Protection (E-Commerce) Rules 2020). The bracketed fields need the registered business’s real details, and the whole page should be reviewed by a licensed attorney before this site takes live orders or payments.',
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    updatedAt: '2026-10-01',
    sections: [
      {
        heading: 'Who we are',
        body: '[Business legal name], a [entity type — sole proprietorship / LLP / private limited, to be filled in once registered], operating this site from India. Registered address and business registration number will be added here once formal registration is complete.',
      },
      {
        heading: 'Using this site',
        body: 'By using this site you agree to provide accurate information when placing an order or creating an account, and not to misuse the site (attempting to disrupt service, scraping at scale, etc.).',
      },
      {
        heading: 'Pricing & availability',
        body: 'Prices and stock levels are shown in real time but aren’t guaranteed until an order is confirmed — an item can occasionally sell out between browsing and checkout. All prices are in INR and inclusive of applicable GST unless stated otherwise.',
      },
      {
        heading: 'Orders & payments',
        body: 'Placing an order is an offer to buy, which we accept by confirming it. Payments are processed by Razorpay; we never see or store your full card, UPI, or bank details. We may cancel and refund an order we reasonably believe is fraudulent or placed in error (e.g. a pricing mistake), and will notify you if we do.',
      },
      {
        heading: 'Cancellations, returns & refunds',
        body: 'See our Shipping and Return policies for timelines and conditions. Refunds are issued to the original payment method once a cancellation or return is approved.',
      },
      {
        heading: 'Accounts',
        body: 'You’re responsible for keeping your account credentials secure. You need an account to place an order, so we can show your order history and let you track deliveries.',
      },
      {
        heading: 'Limitation of liability',
        body: 'To the extent permitted by Indian law, our liability for any claim relating to an order is limited to the amount you paid for that order. We’re not liable for indirect or consequential losses.',
      },
      {
        heading: 'Grievance redressal',
        body: 'Complaints about an order or this site can be sent to our Grievance Officer: [Name] · [email] · [phone]. We’ll acknowledge within 48 hours and aim to resolve within 30 days, as required under the Consumer Protection (E-Commerce) Rules, 2020.',
      },
      {
        heading: 'Governing law',
        body: 'These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts at [city, to be filled in once the business is registered].',
      },
      {
        heading: 'Changes to these terms',
        body: 'We may update these terms as the business grows; the “last updated” date above reflects the latest version. Continued use of the site after an update means you accept the revised terms.',
      },
      {
        heading: 'Draft status',
        body: 'This is a working draft prepared to cover the points Indian consumer and e-commerce law typically requires. The bracketed fields need the registered business’s real details, and the whole page should be reviewed by a licensed attorney before this site takes live orders or payments.',
      },
    ],
  },
  {
    slug: 'photo-credits',
    title: 'Photo credits',
    updatedAt: '2026-09-19',
    sections: [
      {
        heading: 'About these images',
        body: 'Every product, seller and review on this site is fictional demo content. The pictures are placeholders: photographs from Wikimedia Commons under the open licences listed below (cropped and resized), and illustrations drawn for this project.',
      },
      ...imageCredits.map((c) => {
        const credit = c as { kind: string; artist?: string; license?: string; page?: string };
        return {
          heading: c.name,
          body:
            credit.kind === 'photo'
              ? `Photo by ${credit.artist || 'unknown author'} · ${credit.license ?? ''} · ${credit.page ?? ''}`
              : 'Illustration created for this project.',
        };
      }),
    ],
  },
];
