# Response Format API cutad.web.id

Dokumentasi ini menjelaskan format response JSON yang konsisten untuk semua endpoint `https://www.cutad.web.id/public/api/v1/{provider}/{action}`.

## Autentikasi API Key

Semua endpoint memerlukan API key.

Gunakan key berikut:

```text
cutad_431e4ba1cc86a4b6ad6e668e4a857f8604228f81aadc42b7
```

Header:

```http
X-API-Key: cutad_431e4ba1cc86a4b6ad6e668e4a857f8604228f81aadc42b7
```

Query string:

```http
?api_key=cutad_431e4ba1cc86a4b6ad6e668e4a857f8604228f81aadc42b7
```

## Struktur Umum

Semua response utama memiliki struktur:

```json
{
  "data": { ... },
  "pagination": { "page": 1, "size": 20, "total": 150, "hasMore": true }
}
```

Beberapa provider menambahkan atau menggunakan field berbeda, terutama pada response `rank` dan `detail`.

## Rank (Daftar kategori)

### Anime / Film1 / MovieBox / dll

```json
{
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
}
```

### ⚠️ DramaBox

DramaBox menggunakan field khusus:

```json
{
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
}
```

## Detail (Info konten)

### Anime / MovieBox / Melolo

```json
{
  "data": {
    "fakeId": "1000",
    "title": "Judul Anime",
    "coverImgUrl": "https://www.cutad.web.id/api/proxy?u=...",
    "introduce": "Sinopsis...",
    "episodes": [{ "id": 1032, "title": "Episode 1" }],
    "totalOfEpisodes": 12
  }
}
```

### ⚠️ DramaBox

```json
{
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
}
```

### ⚠️ MovieBox tambahan

```json
{
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
}
```

## Watch (URL video)

```json
{
  "data": {
    "videoUrl": "https://www.cutad.web.id/api/proxy?u=..."
  }
}
```

## Catatan Provider Khusus

- **DramaBox** — field berbeda: `bookId`, `bookName`, `introduction`, `chapters[]` (bukan `episodes`)
- **Donghua watch** — tambahan `servers[]`, `embedUrl`, `type` (`embed`/`direct`), `platform`
- **MovieBox watch** — tambahan `subtitles[]` (multi-bahasa), `streams[]` (multi-quality)
- **FreeReels watch** — tambahan `subtitles[]`, `quality`
- **ReelShort** — flow berbeda: perlu `bookId + chapterId + filteredTitle` untuk watch
- **FlickReels watch** — response `Content-Type: application/vnd.apple.mpegurl` (raw m3u8, bukan JSON). Segment URL otomatis diproxy.
- **Melolo search** — menggunakan filter lokal dari cache bookmall, bukan search API; hasil terbatas.

## Sistem ID Provider

Setiap provider menggunakan format ID berbeda:

- **Anime**: `1000` — numeric ID dari Animasu (auto-increment)
- **Donghua**: `a3f8b2c1` — short hash 8 karakter (MD5 hash konsisten, sumber disembunyikan)
- **DramaBox**: `42000002888` — numeric ID (`bookId` dari API DramaBox)
- **Melolo**: `30000182647` — numeric ID (`bookId` dari API Melolo)
- **Film1**: `a1b2c3d4` — short hash 8 karakter (MD5 hash konsisten)
- **Film Indonesia**: `f5e6d7c8` — short hash 8 karakter (MD5 hash konsisten)
- **MovieBox**: `5139196938264400928` — numeric ID (`subjectId` dari API MovieBox; CDN dibungkus proxy)
- **FreeReels**: `drama-key-123` — string key (`seriesKey` dari API FreeReels)
- **ReelShort**: `the-ceos-contract-wife` — slug / hex ID (filtered-title slug untuk rank/detail; detail response `bookId` 24-karakter hex)
- **FlickReels**: `12345::67890` — numeric/composite ID (`playlet_id` numeric untuk rank/detail; `playletId::chapterId` untuk watch)

> Catatan: ID yang sama akan selalu menghasilkan hash yang sama. Jadi `a3f8b2c1` selalu merujuk ke konten yang sama, selama server aktif.

## Endpoint dan Provider

Semua provider mendukung path berikut di base URL:

```text
https://www.cutad.web.id/public/api/v1/{provider}/{action}
```

Provider utama yang tersedia:

- Anime
- Donghua
- DramaBox
- Melolo
- Film1
- Film Indonesia
- MovieBox
- FreeReels
- ReelShort
- FlickReels

### Contoh alur Melolo

1. `rank`
   - Ambil daftar drama/film populer
   - output: `items[].id` (numeric `bookId`)
2. `detail`
   - Pakai `id` dari rank untuk mendapat info dan daftar episode
   - output: `episodes[].videoFakeId` dengan field `id`, `videoFakeId`, `title`, `episodeNumber`
3. `watch`
   - Pakai `videoFakeId` dari detail untuk mendapat `data.videoUrl`

Contoh `curl`:

```bash
curl -H "X-API-Key: YOUR_KEY" \
  "https://www.cutad.web.id/public/api/v1/melolo/rank"

curl -H "X-API-Key: YOUR_KEY" \
  "https://www.cutad.web.id/public/api/v1/melolo/detail?id=30000182647"

curl -H "X-API-Key: YOUR_KEY" \
  "https://www.cutad.web.id/public/api/v1/melolo/watch?id=50001234567"
```

Pagination opsional:

```text
?page=1&size=10
```

### Melolo endpoint

- `GET /public/api/v1/melolo/rank`
  - Daftar drama/film populer & terbaru
  - Parameter: `page` (default: 1), `size` (default: 20, max: 50)
- `GET /public/api/v1/melolo/detail`
  - Detail: judul, cover, sinopsis, daftar episode
  - Parameter: `id` required — `bookId` dari response rank
- `GET /public/api/v1/melolo/episodes`
  - Daftar episode ringkas
  - Parameter: `id` required — `bookId` dari response rank
- `GET /public/api/v1/melolo/watch`
  - URL streaming video episode
  - Parameter: `id` required — `videoFakeId` dari response detail
- `GET /public/api/v1/melolo/search`
  - Cari drama/film berdasarkan judul
  - Parameter: `q` required — kata kunci pencarian
  - Optional: `page`, `size`

## Proxy URL

Semua URL eksternal untuk cover dan video otomatis dibungkus melalui proxy:

```text
https://www.cutad.web.id/api/proxy?u=BASE64URL
```

URL sumber asli tidak pernah diekspos ke pengguna API.
