'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import {
  XMarkIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import api, { endpoints, Blog, BlogRequest } from '@/lib/api'

// ── Toolbar button ────────────────────────────────────────────────────────────
function ToolbarBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      className={`p-1.5 rounded text-xs font-bold transition-colors ${
        active
          ? 'bg-amber-500/20 text-amber-400'
          : 'text-gray-400 hover:text-gray-100 hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
interface Props {
  isOpen: boolean
  onClose: () => void
  blog: Blog | null
  onSaved: () => void
}

export default function BlogFormModal({ isOpen, onClose, blog, onSaved }: Props) {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [author, setAuthor] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── TipTap editor ──
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Write your blog post here…' }),
    ],
    editorProps: {
      attributes: { class: 'tiptap-editor focus:outline-none' },
    },
  })

  // ── Populate form when editing ──
  useEffect(() => {
    if (!isOpen) return
    if (blog) {
      setTitle(blog.title)
      setExcerpt(blog.excerpt || '')
      setAuthor(blog.author || '')
      setCoverImageUrl(blog.coverImageUrl || '')
      setPublished(blog.published)
      editor?.commands.setContent(blog.content || '')
    } else {
      setTitle('')
      setExcerpt('')
      setAuthor('')
      setCoverImageUrl('')
      setPublished(false)
      editor?.commands.clearContent()
    }
  }, [isOpen, blog, editor])

  // ── Image upload ──
  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await api.post(endpoints.blogs.upload, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setCoverImageUrl(res.data.url)
      toast.success('Image uploaded!')
    } catch {
      toast.error('Image upload failed.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }, [])

  // ── Save ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { toast.error('Title is required.'); return }

    setSaving(true)
    const payload: BlogRequest = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: editor?.getHTML() ?? '',
      coverImageUrl,
      author: author.trim(),
      published,
    }

    try {
      if (blog) {
        await api.put(endpoints.blogs.update(blog.id), payload)
        toast.success('Blog post updated!')
      } else {
        await api.post(endpoints.blogs.create, payload)
        toast.success('Blog post created!')
      }
      onSaved()
      onClose()
    } catch {
      toast.error('Failed to save post.')
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-3xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-playfair text-xl font-bold text-gray-100">
                {blog ? 'Edit Post' : 'New Blog Post'}
              </h2>
              <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-800">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5 font-medium">Title *</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. How to Care for Gold Jewellery"
                  required
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
                />
              </div>

              {/* Author + Published row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5 font-medium">Author</label>
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Avyaya Team"
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
                  />
                </div>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setPublished(!published)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${published ? 'bg-amber-500' : 'bg-gray-700'}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${published ? 'translate-x-5' : ''}`} />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">
                      {published ? 'Published' : 'Draft'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5 font-medium">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  placeholder="Short summary shown in the blog listing…"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 resize-none"
                />
              </div>

              {/* Cover image */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5 font-medium">Cover Image</label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm">
                    <PhotoIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-400 truncate flex-1">{coverImageUrl || 'No image selected'}</span>
                    {coverImageUrl && (
                      <button type="button" onClick={() => setCoverImageUrl('')} className="text-gray-500 hover:text-red-400 ml-1 text-xs">✕</button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded-lg transition-colors whitespace-nowrap disabled:opacity-50"
                  >
                    <ArrowUpTrayIcon className="w-4 h-4" />
                    {uploading ? 'Uploading…' : 'Upload'}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
                {/* Preview */}
                {coverImageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverImageUrl} alt="Cover preview" className="mt-2 h-28 w-full object-cover rounded-lg border border-gray-700" />
                )}
              </div>

              {/* Rich text editor */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5 font-medium">Content</label>
                <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                  {/* Toolbar */}
                  <div className="flex flex-wrap gap-0.5 px-2 py-1.5 border-b border-gray-700 bg-gray-850">
                    <ToolbarBtn title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')}>
                      <strong>B</strong>
                    </ToolbarBtn>
                    <ToolbarBtn title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')}>
                      <em>I</em>
                    </ToolbarBtn>
                    <ToolbarBtn title="Underline" onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive('underline')}>
                      <u>U</u>
                    </ToolbarBtn>
                    <ToolbarBtn title="Strikethrough" onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive('strike')}>
                      <s>S</s>
                    </ToolbarBtn>
                    <span className="w-px bg-gray-700 mx-1 self-stretch" />
                    <ToolbarBtn title="Heading 1" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive('heading', { level: 1 })}>
                      H1
                    </ToolbarBtn>
                    <ToolbarBtn title="Heading 2" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })}>
                      H2
                    </ToolbarBtn>
                    <ToolbarBtn title="Heading 3" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })}>
                      H3
                    </ToolbarBtn>
                    <span className="w-px bg-gray-700 mx-1 self-stretch" />
                    <ToolbarBtn title="Bullet List" onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')}>
                      • List
                    </ToolbarBtn>
                    <ToolbarBtn title="Numbered List" onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')}>
                      1. List
                    </ToolbarBtn>
                    <ToolbarBtn title="Blockquote" onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')}>
                      &ldquo;&rdquo;
                    </ToolbarBtn>
                    <span className="w-px bg-gray-700 mx-1 self-stretch" />
                    <ToolbarBtn title="Align Left" onClick={() => editor?.chain().focus().setTextAlign('left').run()} active={editor?.isActive({ textAlign: 'left' })}>
                      ≡L
                    </ToolbarBtn>
                    <ToolbarBtn title="Align Center" onClick={() => editor?.chain().focus().setTextAlign('center').run()} active={editor?.isActive({ textAlign: 'center' })}>
                      ≡C
                    </ToolbarBtn>
                    <ToolbarBtn title="Align Right" onClick={() => editor?.chain().focus().setTextAlign('right').run()} active={editor?.isActive({ textAlign: 'right' })}>
                      ≡R
                    </ToolbarBtn>
                    <span className="w-px bg-gray-700 mx-1 self-stretch" />
                    <ToolbarBtn title="Horizontal Rule" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
                      ──
                    </ToolbarBtn>
                    <ToolbarBtn title="Undo" onClick={() => editor?.chain().focus().undo().run()}>
                      ↩
                    </ToolbarBtn>
                    <ToolbarBtn title="Redo" onClick={() => editor?.chain().focus().redo().run()}>
                      ↪
                    </ToolbarBtn>
                  </div>

                  {/* Editor area */}
                  <EditorContent editor={editor} />
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-gray-950 rounded-lg transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  {saving ? (
                    'Saving…'
                  ) : (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      {blog ? 'Save Changes' : 'Publish Post'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
