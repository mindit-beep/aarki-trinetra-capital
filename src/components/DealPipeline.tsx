import { useState, useEffect, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Plus, Building2, TrendingUp, Briefcase, MapPin, DollarSign, Search, Trash2, Edit3, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/cn'

const SECTORS = ['Real Estate & Strategic Assets', 'Investment & Capital Facilitation', 'Renewable Energy & Green Infrastructure', 'EPC & Infrastructure', 'DPR, Feasibility & Technical', 'Loan & Structured Finance', 'Aviation & Aerospace', 'IT & Digital Infrastructure']
const STAGES = [{ id: 'lead', label: 'Lead', color: '#94a3b8' }, { id: 'qualified', label: 'Qualified', color: '#60a5fa' }, { id: 'mou_sent', label: 'MOU Sent', color: '#a78bfa' }, { id: 'negotiation', label: 'Negotiation', color: '#fbbf24' }, { id: 'facilitation', label: 'Facilitation', color: '#34d399' }, { id: 'closed_won', label: 'Closed Won', color: '#22c55e' }, { id: 'closed_lost', label: 'Closed Lost', color: '#ef4444' }]
const PRIORITIES = ['low', 'medium', 'high', 'critical']
const SECTOR_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#34d399', '#fbbf24', '#f97316', '#ef4444', '#06b6d4']

interface Deal { id: string; title: string; sector: string; description?: string; dealValue?: string; stage: string; priority: string; contactName?: string; contactEmail?: string; contactPhone?: string; location?: string; notes?: string; createdAt: string }
const emptyDeal: Partial<Deal> = { title: '', sector: '', description: '', dealValue: '', stage: 'lead', priority: 'medium', contactName: '', contactEmail: '', contactPhone: '', location: '', notes: '' }

export default function DealPipeline() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [viewingDeal, setViewingDeal] = useState<Deal | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSector, setFilterSector] = useState('all')
  const [filterStage, setFilterStage] = useState('all')
  const [formData, setFormData] = useState<Partial<Deal>>(emptyDeal)
  const [loading, setLoading] = useState(true)

  const fetchDeals = useCallback(async () => { try { const res = await fetch('/api/deals'); const data = await res.json(); setDeals(Array.isArray(data) ? data : data.items ?? data.deals ?? []) } catch { setDeals([]) } setLoading(false) }, [])
  useEffect(() => { fetchDeals() }, [fetchDeals])

  const saveDeal = async () => { if (!formData.title || !formData.sector) return; const method = editingDeal ? 'PATCH' : 'POST'; const url = editingDeal ? `/api/deals/${editingDeal.id}` : '/api/deals'; await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }); setShowForm(false); setEditingDeal(null); setFormData(emptyDeal); fetchDeals() }
  const deleteDeal = async (id: string) => { await fetch(`/api/deals/${id}`, { method: 'DELETE' }); fetchDeals() }

  const filtered = deals.filter(d => { const matchSearch = !searchQuery || d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.contactName?.toLowerCase().includes(searchQuery.toLowerCase()) || d.location?.toLowerCase().includes(searchQuery.toLowerCase()); const matchSector = filterSector === 'all' || d.sector === filterSector; const matchStage = filterStage === 'all' || d.stage === filterStage; return matchSearch && matchSector && matchStage })
  const stageCounts = STAGES.map(s => ({ name: s.label, count: deals.filter(d => d.stage === s.id).length, color: s.color }))
  const sectorData = SECTORS.map((s, i) => ({ name: s.length > 20 ? s.substring(0, 20) + '…' : s, fullName: s, value: deals.filter(d => d.sector === s).length, color: SECTOR_COLORS[i % SECTOR_COLORS.length] })).filter(s => s.value > 0)
  const totalValue = deals.reduce((sum, d) => { const val = parseFloat(d.dealValue?.replace(/[₹$,]/g, '') || '0'); return sum + (isNaN(val) ? 0 : val) }, 0)
  const activeDeals = deals.filter(d => !['closed_won', 'closed_lost'].includes(d.stage)).length
  const getStageColor = (stage: string) => STAGES.find(s => s.id === stage)?.color ?? '#94a3b8'
  const getStageLabel = (stage: string) => STAGES.find(s => s.id === stage)?.label ?? stage
  const getPriorityColor = (p: string) => { if (p === 'critical') return 'bg-red-100 text-red-800 border-red-200'; if (p === 'high') return 'bg-orange-100 text-orange-800 border-orange-200'; if (p === 'medium') return 'bg-yellow-100 text-yellow-800 border-yellow-200'; return 'bg-gray-100 text-gray-800 border-gray-200' }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-indigo-50 rounded-lg"><Briefcase className="h-5 w-5 text-indigo-600" /></div><div><p className="text-sm text-muted-foreground">Total Deals</p><p className="text-2xl font-bold">{deals.length}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-emerald-50 rounded-lg"><TrendingUp className="h-5 w-5 text-emerald-600" /></div><div><p className="text-sm text-muted-foreground">Active Pipeline</p><p className="text-2xl font-bold">{activeDeals}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-amber-50 rounded-lg"><DollarSign className="h-5 w-5 text-amber-600" /></div><div><p className="text-sm text-muted-foreground">Pipeline Value</p><p className="text-2xl font-bold">₹{(totalValue / 10000000).toFixed(1)}Cr</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-purple-50 rounded-lg"><Building2 className="h-5 w-5 text-purple-600" /></div><div><p className="text-sm text-muted-foreground">Sectors Active</p><p className="text-2xl font-bold">{sectorData.length}</p></div></div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2"><CardHeader><CardTitle className="text-base">Pipeline by Stage</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={250}><BarChart data={stageCounts}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="count" radius={[6, 6, 0, 0]}>{stageCounts.map((entry, i) => (<Cell key={i} fill={entry.color} />))}</Bar></BarChart></ResponsiveContainer></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Sector Distribution</CardTitle></CardHeader><CardContent>{sectorData.length > 0 ? (<ResponsiveContainer width="100%" height={250}><PieChart><Pie data={sectorData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>{sectorData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}</Pie><Tooltip /></PieChart></ResponsiveContainer>) : (<div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">No sector data yet</div>)}</CardContent></Card>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search deals..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9" /></div>
        <select value={filterSector} onChange={e => setFilterSector(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm"><option value="all">All Sectors</option>{SECTORS.map(s => <option key={s} value={s}>{s}</option>)}</select>
        <select value={filterStage} onChange={e => setFilterStage(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm"><option value="all">All Stages</option>{STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
        <Button onClick={() => { setFormData(emptyDeal); setEditingDeal(null); setShowForm(true) }}><Plus className="h-4 w-4 mr-2" /> Add Deal</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {STAGES.map(stage => { const stageDeals = filtered.filter(d => d.stage === stage.id); return (
          <div key={stage.id} className="space-y-2">
            <div className="flex items-center gap-2 px-1"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} /><span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stage.label}</span><span className="text-xs text-muted-foreground">({stageDeals.length})</span></div>
            {stageDeals.map(deal => (
              <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setViewingDeal(deal)}><CardContent className="p-3 space-y-2"><div className="flex items-start justify-between gap-1"><h4 className="text-sm font-medium leading-tight line-clamp-2">{deal.title}</h4></div><Badge className={cn('text-[10px] border', getPriorityColor(deal.priority))}>{deal.priority}</Badge>{deal.dealValue && <p className="text-xs font-semibold text-emerald-700">₹{deal.dealValue}</p>}{deal.location && <p className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {deal.location}</p>}<p className="text-[10px] text-muted-foreground truncate">{deal.sector}</p></CardContent></Card>
            ))}
          </div>
        )})}
      </div>

      {deals.length === 0 && !loading && (<Card><CardContent className="p-12 text-center"><Briefcase className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" /><h3 className="text-lg font-semibold mb-2">No Deals Yet</h3><p className="text-sm text-muted-foreground mb-4">Start building your pipeline by adding your first deal.</p><Button onClick={() => { setFormData(emptyDeal); setEditingDeal(null); setShowForm(true) }}><Plus className="h-4 w-4 mr-2" /> Add First Deal</Button></CardContent></Card>)}

      <Dialog open={showForm} onOpenChange={setShowForm}><DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{editingDeal ? 'Edit Deal' : 'Add New Deal'}</DialogTitle></DialogHeader><div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"><div className="md:col-span-2"><Label>Deal Title *</Label><Input value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Mumbai Mixed-Use Development" /></div><div><Label>Sector *</Label><select value={formData.sector || ''} onChange={e => setFormData({ ...formData, sector: e.target.value })} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm mt-1"><option value="">Select sector</option>{SECTORS.map(s => <option key={s} value={s}>{s}</option>)}</select></div><div><Label>Deal Value (₹)</Label><Input value={formData.dealValue || ''} onChange={e => setFormData({ ...formData, dealValue: e.target.value })} placeholder="e.g., 5,00,00,000" /></div><div><Label>Stage</Label><select value={formData.stage || 'lead'} onChange={e => setFormData({ ...formData, stage: e.target.value })} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm mt-1">{STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div><div><Label>Priority</Label><select value={formData.priority || 'medium'} onChange={e => setFormData({ ...formData, priority: e.target.value })} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm mt-1">{PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}</select></div><div className="md:col-span-2"><Label>Description</Label><Textarea value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description of the deal..." rows={3} /></div><div><Label>Contact Name</Label><Input value={formData.contactName || ''} onChange={e => setFormData({ ...formData, contactName: e.target.value })} placeholder="Contact person" /></div><div><Label>Contact Email</Label><Input value={formData.contactEmail || ''} onChange={e => setFormData({ ...formData, contactEmail: e.target.value })} placeholder="email@example.com" /></div><div><Label>Contact Phone</Label><Input value={formData.contactPhone || ''} onChange={e => setFormData({ ...formData, contactPhone: e.target.value })} placeholder="+91 98765 43210" /></div><div><Label>Location</Label><Input value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="City, State" /></div><div className="md:col-span-2"><Label>Notes</Label><Textarea value={formData.notes || ''} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Internal notes..." rows={3} /></div></div><div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button onClick={saveDeal}>{editingDeal ? 'Update' : 'Create'} Deal</Button></div></DialogContent></Dialog>

      <Dialog open={!!viewingDeal} onOpenChange={() => setViewingDeal(null)}><DialogContent className="max-w-lg">{viewingDeal && (<><DialogHeader><div className="flex items-start justify-between"><div><DialogTitle className="text-xl">{viewingDeal.title}</DialogTitle><p className="text-sm text-muted-foreground mt-1">{viewingDeal.sector}</p></div><Badge className={cn('border', getPriorityColor(viewingDeal.priority))}>{viewingDeal.priority}</Badge></div></DialogHeader><div className="space-y-4"><div className="flex items-center gap-3"><div className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: getStageColor(viewingDeal.stage) }}>{getStageLabel(viewingDeal.stage)}</div>{viewingDeal.dealValue && <span className="text-lg font-bold text-emerald-700">₹{viewingDeal.dealValue}</span>}</div>{viewingDeal.description && <p className="text-sm text-muted-foreground">{viewingDeal.description}</p>}<Separator />{viewingDeal.contactName && <div className="flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4 text-muted-foreground" /><span>{viewingDeal.contactName}</span>{viewingDeal.contactEmail && <span className="text-muted-foreground">• {viewingDeal.contactEmail}</span>}</div>}{viewingDeal.location && <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /><span>{viewingDeal.location}</span></div>}{viewingDeal.notes && <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs font-medium text-muted-foreground mb-1">Notes</p><p className="text-sm">{viewingDeal.notes}</p></div>}<div className="flex justify-end gap-2"><Button variant="outline" size="sm" onClick={() => { setEditingDeal(viewingDeal); setFormData(viewingDeal); setShowForm(true); setViewingDeal(null) }}><Edit3 className="h-3 w-3 mr-1" /> Edit</Button><Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => { deleteDeal(viewingDeal.id); setViewingDeal(null) }}><Trash2 className="h-3 w-3 mr-1" /> Delete</Button></div></div></>)}</DialogContent></Dialog>
    </div>
  )
}