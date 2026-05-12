/**
 * JSON内の画像パスの不整合を解消するためのユーティリティ
 */
export const resolveImagePath = (rawPath, category = "column") => {
  if (!rawPath) return "";

  // 1. ファイル名のみを抽出 (basename)
  // スラッシュやバックスラッシュで分割して最後を取得
  const parts = rawPath.split(/[/\\]/);
  const filename = parts[parts.length - 1];
  
  if (!filename) return "";

  // 2. 基本的なNext.jsの公開ディレクトリパス
  // deploy_kabu.py により public/images/{category}/ に同期される想定
  // 注: mangaの場合は /images/Manga01.jpg のように直下にある場合もある
  let baseDir = `/images/${category}/`;
  if (category === "manga") {
      if (rawPath.includes("urakane")) {
          baseDir = "/images/money_secret/";
      } else if (rawPath.includes("maneta")) {
          baseDir = "/images/maneta/";
      } else if (rawPath.includes("manabu")) {
          baseDir = "/manga/manabu/"; // deploy_kabu.py でここへコピーされた
      } else {
          // メインのマンガは /images/ 直下に置かれることが多い
          baseDir = "/images/";
      }
  } else if (category === "manga/urakane") {
      baseDir = "/images/money_secret/"; // 互換性のための残し
  }

  return `${baseDir}${filename}`;
};

/**
 * 拡張子の揺れを許容して画像を表示するためのヘルパー (クライアントサイドでのフォールバック)
 */
export const handleImageError = (e) => {
  const currentSrc = e.target.src;
  if (!currentSrc) return;

  // すでに一度リトライしていたら停止（無限ループ防止）
  if (e.target.dataset.retried) {
      e.target.style.display = 'none';
      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
      return;
  }

  const exts = ['.jpg', '.png', '.jpeg', '.JPG', '.PNG'];
  const currentExt = currentSrc.substring(currentSrc.lastIndexOf('.')).toLowerCase();
  
  // 違う拡張子を試す
  const nextExt = exts.find(ext => ext !== currentExt);
  if (nextExt) {
      e.target.dataset.retried = "true";
      e.target.src = currentSrc.replace(/\.[^/.]+$/, nextExt);
  }
};
