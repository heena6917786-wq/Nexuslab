/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  client: string;
  category: 'ecommerce' | 'saas' | 'brand' | 'creative' | 'graphics';
  image: string;
  wireframeImage: string;
  tech: string[];
  colors: string[];
  fontFamily: string;
  date: string;
  challenge: string;
  solution: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  tags: string[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: 'UI/UX' | 'Typography' | 'Strategy' | 'Development';
  readTime: string;
  date: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  service: 'Brand Identity' | 'UI/UX Design' | 'Full Web Development' | 'Audit & Redesign';
  budget: string;
  timeline: 'Under 1 month' | '1-2 months' | '3+ months';
  description: string;
  status: 'pending' | 'reviewing' | 'concept_ready' | 'accepted';
  date: string;
}
