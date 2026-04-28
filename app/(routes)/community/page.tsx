'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

type Comment = { id: number; authorName: string; content: string }
type Post = {
  id: number;
  authorName: string;
  avatar: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
}

export default function CommunityPage() {
  const { user } = useUser()
  const [posts, setPosts] = useState<Post[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/community/posts')
      setPosts(res.data)
    } catch (error) {
      console.error("Failed to fetch posts")
    } finally {
      setLoading(false)
    }
  }

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    try {
      const res = await axios.post('/api/community/posts', {
        title: newTitle,
        content: newContent,
        authorName: user?.firstName || "Anonymous Developer",
        avatar: user?.imageUrl || "/alex_walk.gif"
      })
      
      const newPost = {
        ...res.data,
        upvotes: 0,
        downvotes: 0,
        comments: []
      }
      
      setPosts([newPost, ...posts])
      setNewTitle('')
      setNewContent('')
      toast.success("Post created!")
    } catch (error) {
      toast.error("Failed to create post. Please sign in.")
    }
  }

  const handleVote = async (postId: number, type: 'up' | 'down') => {
    // Optimistic update logic is tricky when toggling. We will just re-fetch for simplicity to guarantee accuracy,
    // or we can do a naive optimistic update. Let's do naive:
    try {
      await axios.post('/api/community/vote', { postId, type })
      fetchPosts() // Re-fetch to get correct vote counts
    } catch (error) {
      toast.error("Failed to cast vote. Please sign in.")
    }
  }

  const handleAddComment = async (postId: number) => {
    if (!newComment.trim()) return

    try {
      const res = await axios.post('/api/community/comments', {
        postId,
        content: newComment,
        authorName: user?.firstName || "Anonymous Developer"
      })
      
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, res.data]
          }
        }
        return post
      }))
      setNewComment('')
      toast.success("Comment added!")
    } catch (error) {
      toast.error("Failed to add comment. Please sign in.")
    }
  }

  const textShadow = {
    textShadow: "1px 1px 0 #000, -1px -1px 0 #000,1px -1px 0 #000, -1px 1px 0 #000"
  }

  return (
    <div className="min-h-screen bg-black pb-12">
      {/* Banner */}
      <div className="relative">
        <Image
          src="/hero13.gif"
          alt="Community Banner"
          width={1920}
          height={400}
          unoptimized
          className="w-full object-cover h-64 md:h-80"
        />
        <div
          className="absolute top-0 h-full w-full flex flex-col justify-center px-8 md:px-24 xl:px-40 bg-gradient-to-r from-black/90 to-transparent"
          style={textShadow}
        >
          <h1 className="text-6xl md:text-7xl font-game text-white">Community</h1>
          <p className="text-2xl md:text-3xl font-game mt-2 text-zinc-300">Connect, share code, and discuss.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Posts */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="font-game text-4xl text-white border-b-2 border-zinc-800 pb-2">Recent Discussions</h2>
          
          {loading ? (
             <div className="text-white font-game text-2xl">Loading posts...</div>
          ) : posts.length === 0 ? (
             <div className="text-zinc-500 font-game text-2xl">No posts yet. Be the first to start a discussion!</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-zinc-900 border-2 border-zinc-800 rounded-xl p-5 shadow-lg transition-all hover:border-zinc-700">
                <div className="flex gap-4">
                  {/* Voting Column */}
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <button onClick={() => handleVote(post.id, 'up')} className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-green-400 transition-colors">
                      <ThumbsUp size={24} />
                    </button>
                    <span className="font-game text-xl text-white">{post.upvotes - post.downvotes}</span>
                    <button onClick={() => handleVote(post.id, 'down')} className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-red-400 transition-colors">
                      <ThumbsDown size={24} />
                    </button>
                  </div>
                  
                  {/* Content Column */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Image src={post.avatar || '/plant.png'} alt={post.authorName} width={36} height={36} unoptimized className="rounded-full bg-zinc-800 p-1" />
                      <span className="font-game text-xl text-zinc-400">@{post.authorName}</span>
                    </div>
                    
                    <h3 className="font-game text-3xl text-white mb-2">{post.title}</h3>
                    <p className="text-zinc-300 text-lg mb-4">{post.content}</p>
                    
                    <div className="flex items-center gap-4 text-zinc-500">
                      <button 
                        onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                        className="flex items-center gap-2 hover:text-zinc-300 transition-colors font-game text-lg"
                      >
                        <MessageSquare size={18} />
                        {post.comments.length} Comments
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {activeCommentPostId === post.id && (
                  <div className="mt-6 ml-12 border-l-2 border-zinc-800 pl-6 space-y-4">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                        <div className="font-game text-lg text-zinc-400 mb-1">@{comment.authorName}</div>
                        <p className="text-zinc-300">{comment.content}</p>
                      </div>
                    ))}
                    
                    <div className="flex gap-2 mt-4">
                      <Input 
                        placeholder="Add a comment..." 
                        className="bg-zinc-950 border-zinc-800 font-game text-lg py-5"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      />
                      <Button variant="pixel" className="font-game" onClick={() => handleAddComment(post.id)}>
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right Column: Create Post */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border-2 border-zinc-800 rounded-xl p-6 sticky top-24">
            <h2 className="font-game text-3xl text-white mb-6 flex items-center gap-3">
              <Image src="/fire.gif" alt="fire" width={32} height={32} unoptimized />
              Create a Post
            </h2>
            
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <label className="font-game text-zinc-400 text-lg mb-2 block">Title</label>
                <Input 
                  placeholder="What's on your mind?" 
                  className="bg-zinc-950 border-zinc-800 font-game text-lg py-5"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="font-game text-zinc-400 text-lg mb-2 block">Content</label>
                <textarea 
                  placeholder="Describe your question or share your thoughts..." 
                  className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 font-sans text-lg min-h-[120px]"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" variant="pixel" className="w-full font-game text-xl py-6 mt-2">
                Post to Community
              </Button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  )
}
