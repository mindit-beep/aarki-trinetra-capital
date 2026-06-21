import { useState } from 'react'
import { Briefcase, FileText, Mail, BarChart3, Building2, Globe, ChevronRight, Menu, X, Zap, TrendingUp, Users, LayoutDashboard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/cn'
import DealPipeline from '@/components/DealPipeline'
import SectorResearch from '@/components/SectorResearch'
import OutreachTemplates from '@/components/OutreachTemplates'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'deals', label: 'Deal Pipeline', icon: Briefcase },
  { id: 'research', label: 'Sector Research', icon: FileText },
  { id: 'outreach', label: 'Outreach Templates', icon: Mail },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold leading-none">AarKi Trinetra Capital</h1>
                <p className="text-[10px] text-muted-foreground">Capital. Vision. Scale.</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors', activeTab === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-14 bottom-0 w-64 bg-white border-r shadow-lg p-4 space-y-2">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon
              return (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }} className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors', activeTab === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <DashboardView onNavigate={setActiveTab} />}
        {activeTab === 'deals' && <DealPipeline />}
        {activeTab === 'research' && <SectorResearch />}
        {activeTab === 'outreach' && <OutreachTemplates />}
      </main>
    </div>
  )
}

function DashboardView({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome to AarKi Trinetra Capital</h1>
              <p className="text-indigo-100 text-sm">Your strategic command center — Capital. Vision. Scale.</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 text-xs"><Zap className="h-3 w-3 mr-1" /> Powered by AI</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-all hover:border-indigo-200 group" onClick={() => onNavigate('deals')}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors"><Briefcase className="h-6 w-6 text-indigo-600" /></div>
                <div><h3 className="font-semibold">Deal Pipeline</h3><p className="text-xs text-muted-foreground">Track & manage all opportunities</p></div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-all hover:border-emerald-200 group" onClick={() => onNavigate('research')}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors"><FileText className="h-6 w-6 text-emerald-600" /></div>
                <div><h3 className="font-semibold">Sector Research</h3><p className="text-xs text-muted-foreground">Intelligence across 8 sectors</p></div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-all hover:border-amber-200 group" onClick={() => onNavigate('outreach')}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors"><Mail className="h-6 w-6 text-amber-600" /></div>
                <div><h3 className="font-semibold">Outreach Templates</h3><p className="text-xs text-muted-foreground">Emails, proposals & one-pagers</p></div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-600 transition-colors" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold mb-4">Our Sectors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[{ name: 'Real Estate', icon: Building2, color: 'bg-indigo-50 text-indigo-600' }, { name: 'Capital & Investment', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' }, { name: 'Renewable Energy', icon: Globe, color: 'bg-green-50 text-green-600' }, { name: 'Infrastructure', icon: Building2, color: 'bg-orange-50 text-orange-600' }, { name: 'DPR & Feasibility', icon: FileText, color: 'bg-blue-50 text-blue-600' }, { name: 'Structured Finance', icon: BarChart3, color: 'bg-amber-50 text-amber-600' }, { name: 'Aviation & Aerospace', icon: Globe, color: 'bg-purple-50 text-purple-600' }, { name: 'Digital Infrastructure', icon: Users, color: 'bg-cyan-50 text-cyan-600' }].map(sector => { const Icon = sector.icon; return (
              <div key={sector.name} className={cn('p-3 rounded-lg text-center', sector.color)}><Icon className="h-5 w-5 mx-auto mb-1.5" /><p className="text-xs font-medium">{sector.name}</p></div>
            )})}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}