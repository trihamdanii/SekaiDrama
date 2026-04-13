export default function DocsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-slate-900 dark:text-slate-50">
      <h1 className="text-4xl font-semibold mb-6">Dokumentasi API cutad.web.id</h1>
      <p className="mb-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
        Format response konsisten untuk endpoint <code>/public/api/v1/{'{provider}'}/{'{action}'}</code>.
      </p>
      <p className="mb-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
        Semua request dikirim ke base URL <code>https://www.cutad.web.id</code> dengan format:
      </p>
      <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`{BASE}/public/api/v1/{provider}/{action}?{params}`}
</pre>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Key</h2>
        <p className="text-slate-700 dark:text-slate-300">
          Semua endpoint membutuhkan API key.
        </p>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`cutad_431e4ba1cc86a4b6ad6e668e4a857f8604228f81aadc42b7`}
        </pre>
        <p className="text-slate-700 dark:text-slate-300">Gunakan sebagai header atau query string:</p>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`X-API-Key: cutad_431e4ba1cc86a4b6ad6e668e4a857f8604228f81aadc42b7

?api_key=cutad_431e4ba1cc86a4b6ad6e668e4a857f8604228f81aadc42b7`}
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Error Codes</h2>
        <p className="text-slate-700 dark:text-slate-300">
          Jika request gagal karena otentikasi, gunakan header atau query parameter API key.
        </p>
        <div className="rounded-lg border border-amber-300/30 bg-amber-50 p-4 text-sm text-slate-900 dark:border-amber-500/30 dark:bg-slate-900 dark:text-slate-100">
          <p className="font-semibold">401 Unauthorized</p>
          <p className="text-slate-700 dark:text-slate-300">
            API key tidak disertakan atau tidak valid.
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            Tambahkan <code>X-API-Key</code> header atau <code>?api_key=</code> query string.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Response Format Umum</h2>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`{
  "data": { ... },
  "pagination": { "page": 1, "size": 20, "total": 150, "hasMore": true }
}`}
        </pre>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Aksi Umum API</h2>
        <p className="text-slate-700 dark:text-slate-300">
          Setiap provider menggunakan action berikut untuk mengambil data dan navigasi konten.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
          <li><code>rank</code></li>
          <li><code>detail</code></li>
          <li><code>episodes</code></li>
          <li><code>watch</code></li>
          <li><code>search</code></li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Rank (Daftar Kategori)</h2>
        <h3 className="text-xl font-semibold">Anime / Film1 / MovieBox / dll</h3>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`{
  "data": {
    "sections": [{
      "name": "Anime Terbaru",
      "items": [{
        "id": 1000,
        "title": "...",
        "cover": "https://www.cutad.web.id/api/proxy?u=..."
      }]
    }]
  },
  "pagination": {
    "page": 1,
    "size": 20,
    "total": 150,
    "hasMore": true
  }
}`}
        </pre>

        <h3 className="text-xl font-semibold">DramaBox</h3>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`{
  "data": {
    "sections": [{
      "name": "Drama Indonesia",
      "items": [{
        "bookId": "42000002888",
        "bookName": "...",
        "cover": "..."
      }]
    }]
  }
}`}
        </pre>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Detail (Info Konten)</h2>
        <h3 className="text-xl font-semibold">Anime / MovieBox / Melolo</h3>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`{
  "data": {
    "fakeId": "1000",
    "title": "Judul Anime",
    "coverImgUrl": "https://www.cutad.web.id/api/proxy?u=...",
    "introduce": "Sinopsis...",
    "episodes": [{ "id": 1032, "title": "Episode 1" }],
    "totalOfEpisodes": 12
  }
}`}
        </pre>

        <h3 className="text-xl font-semibold">DramaBox</h3>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`{
  "data": {
    "bookName": "Judul Drama",
    "cover": "https://www.cutad.web.id/api/proxy?u=...",
    "introduction": "Sinopsis...",
    "chapters": [{
      "id": "42000002888_1",
      "index": 1,
      "chapterName": "Episode 1"
    }]
  }
}`}
        </pre>

        <h3 className="text-xl font-semibold">MovieBox tambahan</h3>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`{
  "data": {
    "fakeId": "...",
    "title": "...",
    "coverImgUrl": "...",
    "introduce": "...",
    "genre": "Comedy,Drama",
    "year": "2026",
    "rating": "6.9",
    "actors": ["Nama Aktor"],
    "episodes": [{
      "id": "..._s1_e1",
      "title": "S1E1",
      "season": 1,
      "episode": 1
    }]
  }
}`}
        </pre>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Watch</h2>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`{
  "data": {
    "videoUrl": "https://www.cutad.web.id/api/proxy?u=..."
  }
}`}
        </pre>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-semibold">ℹ️ Catatan per Provider</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
          <li>DramaBox — field beda: <code>bookId</code>, <code>bookName</code>, <code>introduction</code>, <code>chapters[]</code> (bukan <code>episodes</code>).</li>
          <li>Donghua watch — tambahan field: <code>servers[]</code> (daftar server embed), <code>embedUrl</code>, <code>type</code> (embed/direct), <code>platform</code>.</li>
          <li>MovieBox watch — tambahan field: <code>subtitles[]</code> (multi-bahasa), <code>streams[]</code> (multi-quality).</li>
          <li>FreeReels watch — tambahan field: <code>subtitles[]</code> (multi-bahasa), <code>quality</code>.</li>
          <li>ReelShort — flow beda: perlu <code>bookId</code> + <code>chapterId</code> + <code>filteredTitle</code> untuk watch (bukan cukup <code>id</code> saja).</li>
          <li>FlickReels watch — response <code>Content-Type: application/vnd.apple.mpegurl</code> (raw m3u8, bukan JSON). Segment URL otomatis diproxy.</li>
          <li>Melolo search — menggunakan filter lokal dari cache bookmall, bukan search API. Hasil terbatas.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Sistem ID Provider</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
          <li><strong>Anime</strong>: <code>1000</code> — numeric ID dari Animasu (auto-increment).</li>
          <li><strong>Donghua</strong>: <code>a3f8b2c1</code> — short hash 8 karakter (MD5 hash konsisten, sumber disembunyikan).</li>
          <li><strong>DramaBox</strong>: <code>42000002888</code> — numeric ID (<code>bookId</code> dari API DramaBox).</li>
          <li><strong>Melolo</strong>: <code>30000182647</code> — numeric ID (<code>bookId</code> dari API Melolo).</li>
          <li><strong>Film1</strong>: <code>a1b2c3d4</code> — short hash 8 karakter (MD5 hash konsisten).</li>
          <li><strong>Film Indonesia</strong>: <code>f5e6d7c8</code> — short hash 8 karakter (MD5 hash konsisten).</li>
          <li><strong>MovieBox</strong>: <code>5139196938264400928</code> — numeric ID (<code>subjectId</code> dari API MovieBox).</li>
          <li><strong>FreeReels</strong>: <code>drama-key-123</code> — string key (<code>seriesKey</code> dari API FreeReels).</li>
          <li><strong>ReelShort</strong>: <code>the-ceos-contract-wife</code> — slug / hex ID (filtered-title slug untuk rank/detail; detail response <code>bookId</code> 24-karakter hex).</li>
          <li><strong>FlickReels</strong>: <code>12345::67890</code> — numeric/composite ID (<code>playlet_id</code> numeric untuk rank/detail; <code>playletId::chapterId</code> untuk watch).</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300">
          Catatan: ID yang sama akan selalu menghasilkan hash yang sama. Jadi <code>a3f8b2c1</code> selalu merujuk ke konten yang sama, selama server aktif.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Contoh Melolo</h2>
        <p className="text-slate-700 dark:text-slate-300">
          Alur penggunaan untuk Melolo:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300">
          <li>rank — ambil daftar drama/film populer, output <code>items[].id</code> sebagai <code>bookId</code>.</li>
          <li>detail — pakai <code>id</code> dari rank untuk mendapat info + daftar episode dengan <code>videoFakeId</code>.</li>
          <li>watch — pakai <code>videoFakeId</code> dari detail untuk mendapat <code>data.videoUrl</code>.</li>
        </ol>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`curl -H "X-API-Key: YOUR_KEY" \
  "https://www.cutad.web.id/public/api/v1/melolo/rank"

curl -H "X-API-Key: YOUR_KEY" \
  "https://www.cutad.web.id/public/api/v1/melolo/detail?id=30000182647"

curl -H "X-API-Key: YOUR_KEY" \
  "https://www.cutad.web.id/public/api/v1/melolo/watch?id=50001234567"
`}
        </pre>
        <p className="text-slate-700 dark:text-slate-300">Pagination opsional: <code>?page=1&size=10</code></p>

        <div className="rounded-lg border border-slate-200/60 bg-slate-50 p-4 dark:border-slate-700/60 dark:bg-slate-950">
          <h3 className="text-xl font-semibold">Melolo Endpoints</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li><code>GET /public/api/v1/melolo/rank</code> — daftar drama/film populer & terbaru.</li>
            <li><code>GET /public/api/v1/melolo/detail</code> — detail konten dengan <code>id</code> <strong>required</strong>.</li>
            <li><code>GET /public/api/v1/melolo/episodes</code> — daftar episode ringkas, <code>id</code> required.</li>
            <li><code>GET /public/api/v1/melolo/watch</code> — URL streaming video episode, <code>id</code> required (<code>videoFakeId</code>).</li>
            <li><code>GET /public/api/v1/melolo/search</code> — cari drama/film, <code>q</code> required.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Proxy URL</h2>
        <p className="text-slate-700 dark:text-slate-300">
          Semua URL eksternal dibungkus otomatis oleh proxy agar sumber asli tidak diekspos.
        </p>
        <pre className="rounded-lg bg-slate-950/90 p-4 text-sm text-slate-100 overflow-x-auto">
{`https://www.cutad.web.id/api/proxy?u=BASE64URL`}
        </pre>
      </section>
    </div>
  );
}
