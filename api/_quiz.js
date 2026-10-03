const MAX_BODY_BYTES = 24 * 1024;
const categories = ['Bilim', 'Tarih', 'Coğrafya', 'Teknoloji', 'Sanat', 'Spor', 'Edebiyat', 'Sinema'];
const difficulties = ['easy', 'hard'];

// AI servisi ulaşılmaz olduğunda oyunun kesilmemesi için küçük, doğrulanmış yerel havuz.
const fallbackQuestions = [
  { category: 'Bilim', difficulty: 'easy', question: 'Dünya\'nın doğal uydusu hangisidir?', options: ['Mars', 'Ay', 'Venüs', 'Jüpiter'], correct: 1 },
  { category: 'Bilim', difficulty: 'hard', question: 'DNA\'nın çift sarmal modelini açıklayan bilim insanlarından biri kimdir?', options: ['James Watson', 'Isaac Newton', 'Louis Pasteur', 'Niels Bohr'], correct: 0 },
  { category: 'Tarih', difficulty: 'easy', question: 'Türkiye Cumhuriyeti hangi yıl ilan edilmiştir?', options: ['1919', '1920', '1923', '1938'], correct: 2 },
  { category: 'Tarih', difficulty: 'hard', question: 'Magna Carta hangi ülkede imzalanmıştır?', options: ['Fransa', 'İngiltere', 'İspanya', 'İtalya'], correct: 1 },
  { category: 'Coğrafya', difficulty: 'easy', question: 'Türkiye\'nin başkenti hangisidir?', options: ['İstanbul', 'İzmir', 'Ankara', 'Bursa'], correct: 2 },
  { category: 'Coğrafya', difficulty: 'hard', question: 'Dünyanın en derin gölü hangisidir?', options: ['Hazar Denizi', 'Baykal Gölü', 'Tanganika Gölü', 'Superior Gölü'], correct: 1 },
  { category: 'Teknoloji', difficulty: 'easy', question: 'HTML kısaltmasındaki “H” harfi neyi ifade eder?', options: ['Hyper', 'High', 'Hybrid', 'Home'], correct: 0 },
  { category: 'Teknoloji', difficulty: 'hard', question: 'Bir web sayfasının stilini tanımlamak için en yaygın kullanılan dil hangisidir?', options: ['CSS', 'SQL', 'JSON', 'Bash'], correct: 0 },
  { category: 'Sanat', difficulty: 'easy', question: 'Mona Lisa tablosunun ressamı kimdir?', options: ['Van Gogh', 'Leonardo da Vinci', 'Picasso', 'Monet'], correct: 1 },
  { category: 'Sanat', difficulty: 'hard', question: 'Empresyonizm akımının Türkçe karşılığı hangisidir?', options: ['Kübizm', 'Dışavurumculuk', 'İzlenimcilik', 'Gerçekçilik'], correct: 2 },
  { category: 'Spor', difficulty: 'easy', question: 'Bir futbol takımında sahada aynı anda kaç oyuncu bulunur?', options: ['9', '10', '11', '12'], correct: 2 },
  { category: 'Spor', difficulty: 'hard', question: 'Olimpiyat halkaları kaç kıtayı simgeler?', options: ['4', '5', '6', '7'], correct: 1 },
  { category: 'Edebiyat', difficulty: 'easy', question: '“Küçük Prens” kitabının yazarı kimdir?', options: ['Antoine de Saint-Exupéry', 'Jules Verne', 'Victor Hugo', 'Franz Kafka'], correct: 0 },
  { category: 'Edebiyat', difficulty: 'hard', question: '“Tutunamayanlar” romanının yazarı kimdir?', options: ['Yaşar Kemal', 'Oğuz Atay', 'Orhan Pamuk', 'Sabahattin Ali'], correct: 1 },
  { category: 'Sinema', difficulty: 'easy', question: 'Film çekimlerinde yönetmenin “motor” demesi neyin başladığını belirtir?', options: ['Müzik provası', 'Kamera kaydı', 'Makyaj', 'Kurgu'], correct: 1 },
  { category: 'Sinema', difficulty: 'hard', question: '“Yurttaş Kane” filminin yönetmeni kimdir?', options: ['Alfred Hitchcock', 'Orson Welles', 'Stanley Kubrick', 'Akira Kurosawa'], correct: 1 },
  { category: 'Spor', difficulty: 'easy', question: 'Basketbolda serbest atış çizgisinden başarılı atış kaç puandır?', options: ['1', '2', '3', '4'], correct: 0 },
  { category: 'Spor', difficulty: 'easy', question: 'Teniste sıfır puan hangi kelimeyle ifade edilir?', options: ['Love', 'Ace', 'Set', 'Deuce'], correct: 0 },
  { category: 'Spor', difficulty: 'easy', question: 'Voleybolda bir takım topa blok teması dışında en fazla kaç kez dokunabilir?', options: ['2', '3', '4', '5'], correct: 1 },
  { category: 'Spor', difficulty: 'easy', question: 'Maratonun resmi uzunluğu yaklaşık kaç kilometredir?', options: ['21,1', '30', '42,2', '50'], correct: 2 },
  { category: 'Spor', difficulty: 'easy', question: 'Satrançta oyuna hangi renk başlar?', options: ['Siyah', 'Beyaz', 'Kura ile belirlenir', 'Turnuvaya göre değişir'], correct: 1 },
  { category: 'Spor', difficulty: 'easy', question: 'Formula 1 yarışlarında damalı bayrak neyi bildirir?', options: ['Yarışın başladığını', 'Güvenlik aracını', 'Yarışın bittiğini', 'Pit yolunu'], correct: 2 },
  { category: 'Spor', difficulty: 'easy', question: 'Güreşte rakibin iki omzunu mindere sabitlemeye ne ad verilir?', options: ['Tuș', 'Servis', 'Ralli', 'Sprint'], correct: 0 },
  { category: 'Spor', difficulty: 'easy', question: 'Golfte topun çukura tek vuruşta sokulmasına ne denir?', options: ['Birdie', 'Eagle', 'Hole in one', 'Par'], correct: 2 },
  { category: 'Spor', difficulty: 'easy', question: 'Hentbolda bir takım sahada kaleci dahil kaç oyuncuyla yer alır?', options: ['5', '6', '7', '8'], correct: 2 },
  { category: 'Spor', difficulty: 'hard', question: 'Futbolda ofsayt kuralının uygulanmasında hangi bölge dikkate alınmaz?', options: ['Rakip yarı alan', 'Kale alanı', 'Orta saha çizgisi', 'Taç çizgisi'], correct: 3 },
  { category: 'Spor', difficulty: 'hard', question: 'Basketbolda NBA potasının yerden yüksekliği yaklaşık kaç metredir?', options: ['2,45', '3,05', '3,60', '4,00'], correct: 1 },
  { category: 'Spor', difficulty: 'hard', question: 'Teniste dört Grand Slam turnuvasından biri hangisidir?', options: ['Wimbledon', 'Davis Kupası', 'Laver Kupası', 'Hopman Kupası'], correct: 0 },
  { category: 'Spor', difficulty: 'hard', question: 'Modern pentatlonda aşağıdaki branşlardan hangisi bulunur?', options: ['Eskrim', 'Ragbi', 'Beyzbol', 'Kriket'], correct: 0 },
  { category: 'Spor', difficulty: 'hard', question: 'Olimpiyatlarda yüzme yarışları genellikle hangi uzunluktaki havuzda yapılır?', options: ['25 metre', '33 metre', '50 metre', '100 metre'], correct: 2 },
  { category: 'Spor', difficulty: 'hard', question: 'Bisiklette Tour de France hangi ülkeyle en çok özdeşleşmiştir?', options: ['İtalya', 'Fransa', 'İspanya', 'Belçika'], correct: 1 },
  { category: 'Spor', difficulty: 'hard', question: 'Boks maçlarında raundlar arasında dinlenme süresi genellikle kaç dakikadır?', options: ['30 saniye', '1 dakika', '2 dakika', '5 dakika'], correct: 1 },
  { category: 'Spor', difficulty: 'hard', question: 'Atletizmde 110 metre engelli yarışı hangi kategoridedir?', options: ['Atlama', 'Atma', 'Sprint-engelli', 'Uzun mesafe'], correct: 2 },
  { category: 'Spor', difficulty: 'hard', question: 'Curling sporunda taşın hedefe doğru ilerlemesini sağlayan yüzey hareketine ne denir?', options: ['Süpürme', 'Sektirme', 'Kavrama', 'Dönüş'], correct: 0 },
];

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function validQuestion(value) {
  return value && typeof value.question === 'string' && value.question.trim().length >= 10
    && Array.isArray(value.options) && value.options.length === 4
    && value.options.every((item) => typeof item === 'string' && item.trim().length > 0)
    && Number.isInteger(value.correct) && value.correct >= 0 && value.correct <= 3;
}

function cleanQuestion(value, category, difficulty) {
  return {
    category,
    difficulty,
    question: value.question.trim(),
    options: value.options.map((item) => item.trim()),
    correct: value.correct,
  };
}

function questionKey(text) {
  return String(text || '').trim().toLocaleLowerCase('tr-TR').replace(/\s+/g, ' ');
}

function chooseFallback(category, difficulty, exclude = []) {
  const excluded = new Set(exclude.map(questionKey));
  const unused = (items) => items.filter((item) => !excluded.has(questionKey(item.question)));
  const exact = unused(fallbackQuestions.filter((item) => item.category === category && item.difficulty === difficulty));
  const sameCategory = unused(fallbackQuestions.filter((item) => item.category === category));
  const anyUnused = unused(fallbackQuestions);
  const pool = exact.length ? exact : (sameCategory.length ? sameCategory : (anyUnused.length ? anyUnused : fallbackQuestions));
  return pool[Math.floor(Math.random() * pool.length)];
}

function parseJsonText(text) {
  if (typeof text !== 'string') return null;
  const withoutFence = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try { return JSON.parse(withoutFence); } catch { /* model may add a short preface */ }
  const start = withoutFence.indexOf('{');
  const end = withoutFence.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  try { return JSON.parse(withoutFence.slice(start, end + 1)); } catch { return null; }
}

async function callManus(category, difficulty, exclude = []) {
  const baseUrl = process.env.MANUS_API_URL;
  const apiKey = process.env.MANUS_API_KEY;
  if (!baseUrl || !apiKey) return null;

  const level = difficulty === 'easy' ? 'Kolay' : 'Zor';
  const prompt = [
    `Sen güvenilir bir Türkçe quiz editörüsün. ${category} kategorisinde ${level} seviyesinde tek bir çoktan seçmeli soru üret.`,
    'Soru genel bilgiye dayanmalı, tartışmalı veya hızla değişen bir bilgi kullanmamalı.',
    'Sadece geçerli JSON döndür; Markdown, açıklama veya kod bloğu ekleme.',
    '{"question":"Soru metni","options":["A","B","C","D"],"correct":0}',
    'correct yalnızca 0, 1, 2 veya 3 olabilir; doğru seçenek options dizisindeki indekstir.',
    exclude.length ? `Bu turda daha önce sorulan sorular şunlar; bunları veya aynı sorunun küçük bir varyasyonunu kesinlikle tekrarlama: ${exclude.join(' | ')}` : '',
  ].filter(Boolean).join('\n');
  const payload = {
    messages: [
      { role: 'system', content: 'Çıktı biçimine kesinlikle uy. Yanıtı Türkçe üret.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.6,
  };
  // İsteğe bağlı model seçimi; yoksa Manus varsayılan rotayı kullanır.
  if (process.env.MANUS_LLM_MODEL) payload.model = process.env.MANUS_LLM_MODEL;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(`${baseUrl.replace(/\/$/, '')}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        const text = data?.choices?.[0]?.message?.content;
        const parsed = parseJsonText(text);
        if (validQuestion(parsed)) return cleanQuestion(parsed, category, difficulty);
      }
      if (![429, 500, 502, 503, 504].includes(response.status)) break;
      await new Promise((resolve) => setTimeout(resolve, 350 * (attempt + 1)));
    } catch (error) {
      if (attempt === 1) break;
    } finally {
      clearTimeout(timeout);
    }
  }
  return null;
}



export async function parseRequestBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (Buffer.byteLength(raw) > MAX_BODY_BYTES) throw new Error('İstek gövdesi çok büyük.');
  }
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

export async function questionHandler(req, res) {
  if (req.method !== 'POST') return jsonResponse(res, 405, { error: 'Yalnızca POST desteklenir.' });
  try {
    const body = await parseRequestBody(req);
    const category = typeof body.category === 'string' ? body.category : '';
    const difficulty = typeof body.difficulty === 'string' ? body.difficulty : '';
    const exclude = Array.isArray(body.exclude) ? body.exclude.filter((item) => typeof item === 'string').slice(0, 20) : [];
    if (!categories.includes(category) || !difficulties.includes(difficulty)) {
      return jsonResponse(res, 400, { error: 'Kategori veya zorluk seçimi geçersiz.' });
    }
    const generated = await callManus(category, difficulty, exclude);
    if (generated && !exclude.map(questionKey).includes(questionKey(generated.question))) {
      return jsonResponse(res, 200, { ...generated, source: 'ai' });
    }
    return jsonResponse(res, 200, { ...chooseFallback(category, difficulty, exclude), source: 'fallback', message: 'Bu turdaki sorular tekrar etmeyecek şekilde seçildi.' });
  } catch (error) {
    return jsonResponse(res, 400, { error: error.message || 'Soru isteği işlenemedi.' });
  }
}

function jsonResponse(res, status, payload) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(payload);
}
