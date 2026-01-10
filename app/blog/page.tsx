'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen, Tag, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '@/components/back-button'

const categories = [
  'All Posts',
  'Product Updates',
  'Creator Stories',
  'Industry News',
  'Tips & Tutorials'
]

const posts = [
  {
    id: 1,
    title: 'Introducing 4K Low-Latency Streaming',
    excerpt: 'Experience crystal clear video quality with our newest streaming engine update. Now available for all partner tier creators.',
    category: 'Product Updates',
    author: 'Alex Chen',
    date: 'Jan 8, 2026',
    readTime: '5 min read',
    image: 'bg-gradient-to-br from-purple-600 to-blue-600',
    featured: true
  },
  {
    id: 2,
    title: 'How "The Night Owls" Scaled to 100k Viewers',
    excerpt: 'A deep dive into the strategy behind one of our fastest-growing comedy channels.',
    category: 'Creator Stories',
    author: 'Sarah James',
    date: 'Jan 5, 2026',
    readTime: '8 min read',
    image: 'bg-gradient-to-br from-amber-400 to-orange-500'
  },
  {
    id: 3,
    title: 'The Future of Interactive Live Events',
    excerpt: 'Why polls, Q&As, and live reactions are reshaping audience engagement.',
    category: 'Industry News',
    author: 'Marcus Johnson',
    date: 'Jan 3, 2026',
    readTime: '6 min read',
    image: 'bg-gradient-to-br from-emerald-500 to-teal-600'
  },
  {
    id: 4,
    title: 'Monetization 101: Maximizing Ticket Sales',
    excerpt: 'Proven strategies to price your events and increase conversion rates.',
    category: 'Tips & Tutorials',
    author: 'Emily White',
    date: 'Dec 28, 2025',
    readTime: '10 min read',
    image: 'bg-gradient-to-br from-pink-500 to-rose-600'
  },
  {
    id: 5,
    title: 'Jaamlist Mobile App V2.0 Release Notes',
    excerpt: 'New chat features, picture-in-picture mode, and improved battery performance.',
    category: 'Product Updates',
    author: 'Dev Team',
    date: 'Dec 20, 2025',
    readTime: '3 min read',
    image: 'bg-gradient-to-br from-indigo-500 to-violet-600'
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts')

  const filteredPosts = selectedCategory === 'All Posts' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const featuredPost = posts.find(p => p.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2d2d2a] to-[#1a1a18] text-white px-4 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto relative z-10">
          <BackButton className="mb-6 text-white/70 hover:text-white" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f7e774]/20 border border-[#f7e774]/30 px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4 text-[#f7e774]" />
              <span className="text-sm font-medium text-[#f7e774]">The Blog</span>
            </div>
            <h1 className="font-display text-5xl font-bold sm:text-6xl lg:text-7xl mb-6">
              Latest Updates
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              News, insights, and stories from the Jaamlist community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          {/* Featured Post */}
          {featuredPost && selectedCategory === 'All Posts' && (
            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Tag className="h-5 w-5 text-[#f7e774]" />
                Featured Story
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden border-none shadow-2xl bg-[#2d2d2a] text-white">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className={`h-64 md:h-auto ${featuredPost.image} relative overflow-hidden group`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                    <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-[#f7e774] mb-4 text-sm font-medium">
                        <span className="uppercase tracking-wider">{featuredPost.category}</span>
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {featuredPost.title}
                      </h3>
                      <p className="text-white/70 text-lg mb-8">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-6">
                        <div className="flex items-center gap-4 text-sm text-white/50">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {featuredPost.author}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {featuredPost.date}
                          </div>
                        </div>
                        <Button variant="link" className="text-[#f7e774] hover:text-[#d4a500] p-0">
                          Read Story <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={`rounded-full px-6 ${
                  selectedCategory === cat 
                    ? 'bg-[#2d2d2a] text-white hover:bg-[#4d4e49]' 
                    : 'hover:bg-[#f7e774]/10'
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(p => !p.featured || selectedCategory !== 'All Posts').map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href="#" className="block h-full border-2 border-transparent hover:border-[#f7e774] rounded-lg transition-all group rounded-xl overflow-hidden">
                  <Card className="h-full border-none shadow-lg flex flex-col overflow-hidden">
                    <div className={`h-48 ${post.image} relative`}>
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                        {post.category}
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl mb-3 group-hover:text-[#d4a500] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium pt-4 border-t">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{post.author}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p>Check back later for updates in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
