/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialBlogPosts } from '../data';
import { BlogPost, Comment } from '../types';
import { Heart, MessageSquare, Clock, User, PlusCircle, Bookmark, CheckCircle, ArrowLeft } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // Create Post drawer state
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'UI/UX' | 'Typography' | 'Strategy' | 'Development'>('UI/UX');
  const [newReadTime, setNewReadTime] = useState('3 min read');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Comments state inside detail reader
  const [commenterName, setCommenterName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Bookmark toggler
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nexus_lab_blog');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(initialBlogPosts);
      }
    } else {
      setPosts(initialBlogPosts);
      localStorage.setItem('nexus_lab_blog', JSON.stringify(initialBlogPosts));
    }
  }, []);

  const handleBookmarkToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal launch
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleLikePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = posts.map(post => {
      if (post.id === id) {
        const currentLikes = post.likes || 0;
        return { ...post, likes: currentLikes + 1 };
      }
      return post;
    });
    setPosts(updated);
    localStorage.setItem('nexus_lab_blog', JSON.stringify(updated));
    if (activePost && activePost.id === id) {
      setActivePost(prev => prev ? { ...prev, likes: (prev.likes || 0) + 1 } : null);
    }
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commenterName || !commentText || !activePost) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: commenterName,
      content: commentText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updatedPosts = posts.map(post => {
      if (post.id === activePost.id) {
        const commentsList = post.comments || [];
        return { ...post, comments: [...commentsList, newComment] };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('nexus_lab_blog', JSON.stringify(updatedPosts));

    // Update active view
    setActivePost(prev => prev ? { ...prev, comments: [...(prev.comments || []), newComment] } : null);

    setCommenterName('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 2000);
  };

  const submitNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newExcerpt || !newContent) return;

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newTitle,
      excerpt: newExcerpt,
      content: newContent,
      author: 'Nexus Lab Studio',
      category: newCategory,
      readTime: newReadTime,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      imageUrl: `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/800/550`,
      likes: 0,
      comments: []
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('nexus_lab_blog', JSON.stringify(updated));

    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setShowCreateDrawer(false);
    }, 2000);
  };

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());

  const categories = [
    { id: 'all', label: 'All Essays' },
    { id: 'UI/UX', label: 'UI/UX Design' },
    { id: 'Typography', label: 'Typography' },
    { id: 'Strategy', label: 'Business Strategy' },
    { id: 'Development', label: 'Systems Development' }
  ];

  return (
    <section id="blog-section" className="py-20 md:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-xl space-y-3">
            <div className="text-[11px] font-mono font-medium tracking-wider text-blue-400 uppercase">Knowledge Hub & Insights</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white animate-fade-in">
              The Design Insight Logs
            </h2>
            <p className="text-white/70 font-sans font-light">
              Dive deep into layout studies, core responsive hierarchies, type pairings, and modern e-commerce sales conversion mechanics.
            </p>
          </div>

          <button
            onClick={() => setShowCreateDrawer(!showCreateDrawer)}
            className="mt-6 md:mt-0 px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white/95 hover:bg-white/10 hover:border-white/20 hover:text-white text-xs font-mono font-bold tracking-wide uppercase cursor-pointer transition-all duration-200 inline-flex items-center space-x-2 shadow-sm"
          >
            <PlusCircle size={14} className="text-blue-400" />
            <span>{showCreateDrawer ? 'Cancel Essay' : 'Write insights'}</span>
          </button>
        </div>

        {/* 1. CREATOR DRAWER */}
        {showCreateDrawer && (
          <div className="mb-12 p-6 md:p-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="space-y-1 mb-6">
              <h3 className="font-heading text-xl font-bold text-white">Draft New Design Insight Post</h3>
              <p className="text-xs text-white/50">Formulate and publish digital perspectives that highlight your creative authority.</p>
            </div>

            {publishSuccess ? (
              <div className="p-6 text-center space-y-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <CheckCircle size={36} className="text-emerald-400 mx-auto" />
                <h4 className="font-heading font-bold text-emerald-300">Essay Published Live!</h4>
                <p className="text-xs text-emerald-400/85">Prepending new post to design logs catalog...</p>
              </div>
            ) : (
              <form onSubmit={submitNewPost} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Essay Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Beyond the Hover State: Meaningful Website Interactions" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-sm p-2.5 border border-white/10 rounded-lg outline-none focus:border-white/20 bg-[#020617]/50 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Category</label>
                    <select 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full text-sm p-2.5 border border-white/10 rounded-lg bg-[#020617]/70 text-white outline-none focus:border-white/25"
                    >
                      <option value="UI/UX" className="bg-[#020617] text-white">UI/UX Design</option>
                      <option value="Typography" className="bg-[#020617] text-white">Typography</option>
                      <option value="Strategy" className="bg-[#020617] text-white">Business Strategy</option>
                      <option value="Development" className="bg-[#020617] text-white">Systems Development</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Read Duration Calculation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 5 min read" 
                      value={newReadTime}
                      onChange={(e) => setNewReadTime(e.target.value)}
                      className="w-full text-sm p-2.5 border border-white/10 rounded-lg outline-none focus:border-white/20 bg-[#020617]/55 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Article Snippet Summary *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Short meta description to excite readers in the grid list catalog..." 
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    className="w-full text-sm p-2.5 border border-white/10 rounded-lg outline-none focus:border-white/20 bg-[#020617]/55 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-bold">Full Essay Markdown Copy *</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Provide full article bodies. Support markdown headers like ### Sizing rules..." 
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full text-xs font-mono p-3 border border-white/10 rounded-lg outline-none focus:border-white/20 bg-[#020617]/55 text-white resize-y leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-white text-black hover:bg-white/90 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Publish Article Insight
                </button>
              </form>
            )}
          </div>
        )}

        {/* 2. CATEGORY PILL SELECTORS */}
        <div className="flex flex-wrap gap-1.5 mb-8 border-b border-white/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                selectedCategory.toLowerCase() === cat.id.toLowerCase()
                  ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-md'
                  : 'bg-white/5 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. ARTICLES CATALOG GRID */}
        {!activePost ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const bookmarked = bookmarkedIds.includes(post.id);
              return (
                <article 
                  key={post.id}
                  id={`blog-card-${post.id}`}
                  onClick={() => setActivePost(post)}
                  className="group cursor-pointer flex flex-col bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:border-white/20 transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#020617]/55 border-b border-white/10">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating elements */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-white/95 uppercase tracking-wider">
                      {post.category}
                    </div>

                    <button
                      onClick={(e) => handleBookmarkToggle(post.id, e)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/65 hover:bg-black border border-white/10 text-white cursor-pointer"
                    >
                      <Bookmark size={13} fill={bookmarked ? 'currentColor' : 'none'} className={bookmarked ? 'text-amber-400' : 'text-white/80'} />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-[10px] font-mono text-white/40">
                        <span className="flex items-center space-x-1">
                          <Clock size={11} />
                          <span>{post.readTime}</span>
                        </span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="font-heading text-base font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/70 text-xs font-sans font-light line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Meta stats like hearts and messages */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                      <span className="flex items-center space-x-1 text-white/70 font-medium">
                        <User size={11} className="text-blue-400" />
                        <span>By {post.author}</span>
                      </span>

                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={(e) => handleLikePost(post.id, e)}
                          className="flex items-center space-x-1 hover:text-red-400 cursor-pointer text-white/60"
                        >
                          <Heart size={12} />
                          <span>{post.likes || 0}</span>
                        </button>
                        <span className="flex items-center space-x-1">
                          <MessageSquare size={12} />
                          <span>{post.comments?.length || 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          
          /* 4. EXPANDABLE READING SCREEN */
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            
            {/* Header navigations */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <button
                onClick={() => setActivePost(null)}
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-medium text-white/60 hover:text-white cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back to insights catalog</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => handleBookmarkToggle(activePost.id, e)}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 cursor-pointer"
                >
                  <Bookmark size={14} fill={bookmarkedIds.includes(activePost.id) ? 'currentColor' : 'none'} className={bookmarkedIds.includes(activePost.id) ? 'text-amber-400' : 'text-white/60'} />
                </button>
                <button
                  onClick={(e) => handleLikePost(activePost.id, e)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-[#ff8c8c]/35 text-red-400 text-xs font-mono cursor-pointer"
                >
                  <Heart size={14} fill="currentColor" />
                  <span>Recommend ({activePost.likes || 0})</span>
                </button>
              </div>
            </div>

            {/* Reading detail blocks */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded bg-gradient-to-br from-blue-500 to-purple-600 text-white font-mono text-[10px] tracking-widest uppercase">
                  {activePost.category}
                </span>

                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                  {activePost.title}
                </h1>

                <div className="flex items-center space-x-4 text-xs font-mono text-white/40">
                  <span className="flex items-center space-x-1.5 text-white/80">
                    <User size={13} className="text-blue-400" />
                    <span>{activePost.author}</span>
                  </span>
                  <span>/</span>
                  <span className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{activePost.readTime}</span>
                  </span>
                  <span>/</span>
                  <span>{activePost.date}</span>
                </div>
              </div>

              {/* Large banner graphic standard no-referrer */}
              <div className="h-64 sm:h-96 w-full rounded-xl overflow-hidden bg-[#020617]/40 border border-white/10 leading-none">
                <img 
                  src={activePost.imageUrl} 
                  alt={activePost.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Article Content Layout */}
              <div className="prose max-w-none text-white/80 font-sans font-light text-sm sm:text-base leading-relaxed space-y-4 pt-4 border-t border-white/10">
                {activePost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={index} className="font-heading text-lg sm:text-xl font-bold text-white mt-6 mb-2">
                        {paragraph.substring(4)}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('-')) {
                    const lines = paragraph.split('\n');
                    return (
                      <ul key={index} className="list-disc pl-5 my-3 space-y-1 text-sm text-white/70">
                        {lines.map((line, liIdx) => (
                          <li key={liIdx}>{line.replace(/^- /, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-white/85 whitespace-pre-line leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* COMMENTS MODULES */}
            <div className="pt-8 border-t border-white/10 space-y-6">
              <div className="flex items-center space-x-2">
                <MessageSquare size={18} className="text-blue-400" />
                <h3 className="font-heading text-lg font-bold text-white">
                  Discussion Panel ({activePost.comments?.length || 0} response)
                </h3>
              </div>

              {/* Response Submissions block */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-xs font-mono font-bold uppercase text-white/40 mb-3">Add your perspective</h4>
                
                {commentSuccess ? (
                  <div className="p-3 bg-emerald-500/10 rounded-lg text-[11px] text-emerald-300 font-mono flex items-center space-x-2 border border-emerald-500/20">
                    <CheckCircle size={14} className="text-emerald-400" />
                    <span>Your response has been published directly below!</span>
                  </div>
                ) : (
                  <form onSubmit={submitComment} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        required
                        placeholder="Your name" 
                        value={commenterName}
                        onChange={(e) => setCommenterName(e.target.value)}
                        className="p-2.5 text-xs bg-[#020617]/50 text-white border border-white/10 rounded focus:border-white/20 outline-none"
                      />
                    </div>
                    <textarea 
                      required
                      placeholder="Share your experience or inquiry regarding this layout strategy..." 
                      rows={2}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full p-2.5 text-xs bg-[#020617]/50 text-white border border-white/10 rounded focus:border-white/20 outline-none resize-y"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white text-black hover:bg-white/95 rounded text-[10px] font-mono font-bold tracking-widest uppercase cursor-pointer"
                    >
                      Publish response
                    </button>
                  </form>
                )}
              </div>

              {/* Comments Lists */}
              <div className="space-y-4">
                {activePost.comments?.length > 0 ? (
                  activePost.comments.map((comm) => (
                    <div key={comm.id} className="p-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white/90">{comm.author}</span>
                        <span className="text-[10px] font-mono text-white/40">{comm.date}</span>
                      </div>
                      <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                        {comm.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-white/40 font-sans italic">
                    No replies yet. Be the first to start the discussion!
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
