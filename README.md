# İnadına TV Quiz

İnadına TV markalı, tekrar etmeyen sorulara sahip Türkçe AI quiz oyunu.

## GitHub Pages bağlantısı

GitHub Pages sürümü statik olarak yayınlanır. API erişimi olmayan bu sürüm, yerel soru havuzuyla çalışır:

`https://inadinatv.github.io/OyunQiz/`

## Vercel bağlantısı ve AI soruları

Vercel sürümü `/api/question` sunucu fonksiyonunu kullanır. Gerçek zamanlı AI üretimi için Vercel Project Settings > Environment Variables bölümüne `MANUS_API_URL` ve `MANUS_API_KEY` ekleyin. Bu değişkenler GitHub'a eklenmemelidir.

AI değişkenleri tanımlı olmasa bile Vercel sürümü doğrulanmış yedek soru havuzuyla çalışır.
