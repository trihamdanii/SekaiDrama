"use client";

import { Compass, Home, MessageCircle, Sparkles, User, Heart, Share2, Play } from "lucide-react";
import { PlatformSelector } from "@/components/PlatformSelector";
import { DramaSection } from "@/components/DramaSection";
import { ReelShortSection } from "@/components/ReelShortSection";
import { ShortMaxHome } from "@/components/ShortMaxHome";
import { NetShortHome } from "@/components/NetShortHome";
import { MeloloHome } from "@/components/MeloloHome";
import { FreeReelsHome } from "@/components/FreeReelsHome";
import { DramaNovaHome } from "@/components/DramaNovaHome";
import { InfiniteDramaSection } from "@/components/InfiniteDramaSection";
import { useLatestDramas, useTrendingDramas, useDubindoDramas } from "@/hooks/useDramas";
import { usePlatform } from "@/hooks/usePlatform";
import type { Drama } from "@/types/drama";

interface FeedCardProps {
  drama: Drama;
}

function FeedCard({ drama }: FeedCardProps) {
  return (
    <article className="feed-card group">
      <a href={`/detail/dramabox/${drama.bookId}`} className="absolute inset-0 z-10" aria-label={drama.bookName} />
      <img
        src={drama.coverWap || drama.cover || ""}
        alt={drama.bookName}
        className="feed-card-image"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <div className="feed-card-overlay">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-primary shadow-lg">
            <Play className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary font-semibold">For You</p>
            <h3 className="mt-2 font-display font-bold text-lg md:text-xl text-white line-clamp-2">{drama.bookName}</h3>
          </div>
        </div>
        <div className="feed-card-actions">
          <button className="tiktok-action-button" type="button">
            <Heart className="w-4 h-4" />
            <span>1.2k</span>
          </button>
          <button className="tiktok-action-button" type="button">
            <MessageCircle className="w-4 h-4" />
            <span>312</span>
          </button>
          <button className="tiktok-action-button" type="button">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function DiscoverCard({ label }: { label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-card/75 p-5 shadow-[0_30px_80px_-55px_rgba(0,0,0,0.5)]">
      <p className="text-sm text-muted-foreground">Trend</p>
      <p className="mt-2 font-semibold text-foreground text-lg">{label}</p>
    </div>
  );
}

export default function HomeContent() {
  const {
    isDramaBox,
    isReelShort,
    isShortMax,
    isNetShort,
    isMelolo,
    isFreeReels,
    isDramaNova,
    platformInfo,
  } = usePlatform();

  const {
    data: latestDramas,
    isLoading: loadingLatest,
    error: errorLatest,
    refetch: refetchLatest,
  } = useLatestDramas();
  const {
    data: trendingDramas,
    isLoading: loadingTrending,
    error: errorTrending,
    refetch: refetchTrending,
  } = useTrendingDramas();
  const {
    data: dubindoDramas,
    isLoading: loadingDubindo,
    error: errorDubindo,
    refetch: refetchDubindo,
  } = useDubindoDramas();

  const featuredDramas = latestDramas?.slice(0, 3) ?? [];

  return (
    <main className="min-h-screen pt-16 pb-28">
      <div className="glass-strong sticky top-16 z-40">
        <div className="container mx-auto">
          <PlatformSelector />
        </div>
      </div>

      <section className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-[0_40px_120px_-80px_rgba(139,92,246,0.5)]">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">SekaiDrama Feed</p>
                  <h1 className="mt-4 text-3xl font-display font-bold text-foreground md:text-4xl">Temukan konten dramatis seperti di aplikasi creator</h1>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">Nikmati rekomendasi personal, campuran konten viral, dan koleksi terbaru dengan nuansa layar penuh yang dinamis.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white/5 p-4 text-center">
                    <p className="text-3xl font-bold text-foreground">{platformInfo.name}</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mt-1">Platform</p>
                  </div>
                  <div className="rounded-3xl bg-primary/10 p-4 text-center">
                    <p className="text-3xl font-bold text-primary">Flow</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mt-1">Mode</p>
                  </div>
                  <div className="rounded-3xl bg-secondary/10 p-4 text-center">
                    <p className="text-3xl font-bold text-secondary">Live</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mt-1">Update</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featuredDramas.map((drama, index) => (
                <FeedCard key={drama.bookId ?? index} drama={drama} />
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-card/75 p-6">
                <h2 className="text-xl font-display font-semibold text-foreground">For You</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Konten yang dirangkai untuk kamu, dengan kombinasi genre, cerita pendek, dan serial mini yang sedang naik daun.</p>
                <div className="mt-5 space-y-3">
                  <DiscoverCard label="Cerita romantis viral" />
                  <DiscoverCard label="Aksi pendek terbaik" />
                  <DiscoverCard label="Drama familier" />
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-card/75 p-6">
                <h2 className="text-xl font-display font-semibold text-foreground">Explore</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Jelajahi koleksi terbaru, rekomendasi editor, dan tag populer seputar cerita pendek.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {['#romance', '#thriller', '#komedi', '#anime', '#ceritahidup'].map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="space-y-6 sticky top-28">
              <div className="rounded-[2rem] border border-white/10 bg-card/75 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-foreground">Trending sekarang</h3>
                <div className="mt-5 space-y-4">
                  {['Drama Mini', 'Cerita Kejutan', 'Live Action', 'Fan Favorite'].map((item) => (
                    <div key={item} className="rounded-3xl border border-white/10 bg-background/50 p-4">
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-card/75 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-foreground">Mode feed</h3>
                <p className="mt-3 text-sm text-muted-foreground">Geser ke atas untuk melanjutkan dan biarkan content engine bekerja seperti aplikasi sosial modern.</p>
                <div className="mt-5 flex flex-col gap-3">
                  {[
                    { icon: Home, title: 'Beranda', label: 'Rekomendasi utama' },
                    { icon: Compass, title: 'Jelajah', label: 'Kategori & tag' },
                    { icon: User, title: 'Akun', label: 'Profil & favorit' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-background/60 p-4">
                      <item.icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {isDramaBox && (
        <div className="container mx-auto px-4 space-y-8">
          <DramaSection
            title="Terbaru"
            dramas={latestDramas}
            isLoading={loadingLatest}
            error={!!errorLatest}
            onRetry={() => refetchLatest()}
          />
          <DramaSection
            title="Terpopuler"
            dramas={trendingDramas}
            isLoading={loadingTrending}
            error={!!errorTrending}
            onRetry={() => refetchTrending()}
          />
          <DramaSection
            title="Dubindo"
            dramas={dubindoDramas}
            isLoading={loadingDubindo}
            error={!!errorDubindo}
            onRetry={() => refetchDubindo()}
          />
          <InfiniteDramaSection title="Lainnya" />
        </div>
      )}

      {isReelShort && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <ReelShortSection />
        </div>
      )}

      {isShortMax && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <ShortMaxHome />
        </div>
      )}

      {isNetShort && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <NetShortHome />
        </div>
      )}

      {isMelolo && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <MeloloHome />
        </div>
      )}

      {isFreeReels && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <FreeReelsHome />
        </div>
      )}

      {isDramaNova && (
        <div className="container mx-auto px-4 py-6 space-y-8">
          <DramaNovaHome />
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-t-3xl border border-white/10 bg-card/95 px-4 py-3 shadow-[0_-20px_60px_-40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {[
            { icon: Home, label: 'Home' },
            { icon: Compass, label: 'Jelajah' },
            { icon: Sparkles, label: 'Trend' },
            { icon: User, label: 'Akun' },
          ].map((item) => (
            <button key={item.label} className="inline-flex flex-col items-center gap-1 rounded-3xl px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors" type="button">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

