import streamlit as st

# ─────────────────────────────────────────────────
# 共通スタイル
# ─────────────────────────────────────────────────
LEGAL_CSS = """
<style>
.legal-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 0;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    line-height: 1.8;
    color: #2D3436;
}
.legal-h1 {
    font-size: 1.6rem;
    font-weight: 800;
    color: #FF6B6B;
    border-bottom: 3px solid #FFE66D;
    padding-bottom: 10px;
    margin-bottom: 24px;
}
.legal-h2 {
    font-size: 1.1rem;
    font-weight: 800;
    color: #2D3436;
    margin-top: 32px;
    margin-bottom: 8px;
    padding-left: 10px;
    border-left: 4px solid #FF6B6B;
}
.legal-p {
    font-size: 0.92rem;
    color: #444;
    margin-bottom: 12px;
}
.legal-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    margin-bottom: 16px;
}
.legal-table th {
    background: #FFF9F0;
    padding: 10px 14px;
    text-align: left;
    border: 1px solid #FFE082;
    width: 160px;
    font-weight: 700;
    color: #555;
}
.legal-table td {
    padding: 10px 14px;
    border: 1px solid #f0f0f0;
    color: #333;
}
.legal-updated {
    font-size: 0.78rem;
    color: #aaa;
    margin-bottom: 20px;
}
</style>
"""

def _card(content: str):
    st.markdown(f"""
<div style="
  background: white;
  border-radius: 16px;
  padding: 32px 36px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  border: 1px solid #f5f5f5;
  margin-bottom: 24px;
">
{content}
</div>
""", unsafe_allow_html=True)


# ─────────────────────────────────────────────────
# 1. プライバシーポリシー
# ─────────────────────────────────────────────────
def render_privacy_policy():
    st.markdown(LEGAL_CSS, unsafe_allow_html=True)
    _card("""
<div class="legal-container">
<div class="legal-h1">🔒 プライバシーポリシー</div>
<div class="legal-updated">最終更新日：2026年3月13日</div>

<div class="legal-p">
カブ先生のだれでもわかるお金の学校（以下「当サイト」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
</div>

<div class="legal-h2">1. 収集する情報</div>
<div class="legal-p">
当サイトでは、現在以下の情報を収集する場合があります。
</div>
<ul class="legal-p">
<li>アクセスログ（IPアドレス、ブラウザの種類、アクセス日時）</li>
<li>Cookieによるセッション情報（ページ遷移・診断結果の一時保存）</li>
<li>お問い合わせフォームからご入力いただいた情報</li>
</ul>

<div class="legal-h2">2. 収集した情報の利用目的</div>
<div class="legal-p">
収集した情報は以下の目的にのみ使用します：
</div>
<ul class="legal-p">
<li>サービスの改善・機能開発</li>
<li>アクセス解析（Google Analytics などの第三者サービスを利用する場合があります）</li>
<li>お問い合わせへの回答</li>
</ul>

<div class="legal-h2">3. 第三者への提供</div>
<div class="legal-p">
当サイトは、以下の場合を除き、ユーザーの個人情報を第三者に提供・開示しません：
</div>
<ul class="legal-p">
<li>ユーザーの同意がある場合</li>
<li>法令に基づく場合</li>
</ul>

<div class="legal-h2">4. Cookieについて</div>
<div class="legal-p">
当サイトではセッション管理のためにCookieを使用します。ブラウザの設定によりCookieを無効にすることが可能ですが、一部機能が正常に動作しなくなる場合があります。
</div>

<div class="legal-h2">5. アクセス解析ツール</div>
<div class="legal-p">
当サイトでは、Google Analytics を使用する場合があります。Google Analytics はCookieを使用してアクセス情報を収集しますが、個人を特定する情報は含まれません。詳しくは <a href="https://policies.google.com/privacy" target="_blank">Googleのプライバシーポリシー</a> をご参照ください。
</div>

<div class="legal-h2">6. 外部リンクについて</div>
<div class="legal-p">
当サイトには証券会社等の外部サイトへのリンクが含まれます。外部サイトのプライバシーポリシーは各サイトの定めに従うものとし、当サイトは外部サイトの取り扱いに責任を負いません。
</div>

<div class="legal-h2">7. プライバシーポリシーの変更</div>
<div class="legal-p">
本ポリシーは必要に応じて改定することがあります。最新版は当ページにて公開します。
</div>

<div class="legal-h2">8. お問い合わせ</div>
<div class="legal-p">
本ポリシーに関するお問い合わせは、お問い合わせページよりお願いします。
</div>
</div>
""")


# ─────────────────────────────────────────────────
# 2. 免責事項
# ─────────────────────────────────────────────────
def render_disclaimer():
    st.markdown(LEGAL_CSS, unsafe_allow_html=True)
    _card("""
<div class="legal-container">
<div class="legal-h1">⚠️ 免責事項</div>
<div class="legal-updated">最終更新日：2026年3月13日</div>

<div class="legal-h2">1. 投資に関する免責</div>
<div class="legal-p">
当サイトで提供する情報は、<strong>教育・情報提供を目的としたものです</strong>。特定の金融商品・有価証券の購入、売却、保有を推薦するものではありません。<br>
投資判断はご自身の責任のもとで行ってください。当サイトの情報を利用したことで生じた損失・損害について、当サイトは一切責任を負いません。
</div>

<div class="legal-h2">2. 情報の正確性について</div>
<div class="legal-p">
当サイトでは正確な情報の提供に努めますが、掲載情報の完全性・正確性・最新性を保証するものではありません。株価・為替・金融商品の情報は、実際の市場価格と異なる場合があります。
</div>

<div class="legal-h2">3. AI診断・コンテンツについて</div>
<div class="legal-p">
当サイトの「AI投資診断」や「カブ先生の質問箱」などのコンテンツは、教育目的のエンターテイメントです。投資アドバイスや金融相談の代替となるものではありません。
</div>

<div class="legal-h2">4. 外部サービスへのリンク</div>
<div class="legal-p">
当サイトに掲載している証券会社等への外部リンクについて、当サイトはリンク先のサービス内容・品質・安全性について保証しません。リンク先サービスの利用は、ユーザー自身の責任において行ってください。
</div>

<div class="legal-h2">5. 仮想投資シミュレーターについて</div>
<div class="legal-p">
当サイトの仮想お財布・投資シミュレーターは教育用のゲームです。このシミュレーターの結果は実際の資産形成の結果を保証するものではありません。
</div>

<div class="legal-h2">6. 著作権</div>
<div class="legal-p">
当サイトのキャラクター・テキスト・デザイン・画像等のコンテンツは、当サイトに帰属します。無断転載・複製を禁じます。
</div>
</div>
""")


# ─────────────────────────────────────────────────
# 3. 特定商取引法に基づく表記
# ─────────────────────────────────────────────────
def render_tokushoho():
    st.markdown(LEGAL_CSS, unsafe_allow_html=True)
    _card("""
<div class="legal-container">
<div class="legal-h1">📋 特定商取引法に基づく表記</div>
<div class="legal-updated">最終更新日：2026年3月13日</div>

<div class="legal-p">
当サイトは現在、有料サービス・商品の販売は行っておりません。ただし、法令に準じて運営者情報を開示します。
</div>

<table class="legal-table">
<tr><th>運営者名</th><td>TooN合同会社</td></tr>
<tr><th>代表者名</th><td>横山 将明</td></tr>
<tr><th>所在地</th><td>〒520-0044 滋賀県大津市京町4-4-8</td></tr>
<tr><th>電話番号</th><td>077-576-4779</td></tr>
<tr><th>メールアドレス</th><td>お問い合わせページよりご連絡ください</td></tr>
<tr><th>サービス内容</th><td>投資教育・情報提供コンテンツ（無料）</td></tr>
<tr><th>料金</th><td>無料（別途有料サービスが生じる場合は別途明示）</td></tr>
<tr><th>販売期間</th><td>なし（情報提供サービスのため）</td></tr>
<tr><th>返品・不具合</th><td>デジタルコンテンツのため返品不可。不具合はお問い合わせください。</td></tr>
</table>

<div class="legal-p">
※当サイトに掲載している証券会社等のリンクはアフィリエイトリンクを含む場合があります（<strong>PR</strong>）。
</div>
</div>
""")


# ─────────────────────────────────────────────────
# 4. お問い合わせ
# ─────────────────────────────────────────────────
def render_contact():
    st.markdown(LEGAL_CSS, unsafe_allow_html=True)
    _card("""
<div class="legal-container">
<div class="legal-h1">✉️ お問い合わせ</div>
<div class="legal-p">
ご質問・ご意見・不具合の報告などは以下のフォームよりお気軽にお送りください。<br>
通常、数日以内に返信いたします。
</div>
</div>
""")

    with st.form("contact_form"):
        col1, col2 = st.columns(2)
        with col1:
            name  = st.text_input("お名前 *")
        with col2:
            email = st.text_input("メールアドレス *")
        category = st.selectbox("お問い合わせの種類", [
            "サイトに関するご意見・ご感想",
            "掲載情報の誤りのご指摘",
            "不具合・エラーの報告",
            "著作権・掲載内容に関するご連絡",
            "その他",
        ])
        message = st.text_area("お問い合わせ内容 *", height=160, placeholder="お気軽にご記入ください")
        agree   = st.checkbox("プライバシーポリシーに同意する")
        submitted = st.form_submit_button("送信する", use_container_width=True, type="primary")

    if submitted:
        if not name or not email or not message:
            st.error("必須項目（お名前・メール・内容）をすべてご入力ください。")
        elif not agree:
            st.error("プライバシーポリシーへの同意が必要です。")
        else:
            st.success(f"お問い合わせを受け付けました！ {name} 様、ありがとうございます。内容を確認次第ご連絡いたします。")
            st.info("※ 現在はデモ送信です。実際の送信機能は準備中です。")

    st.markdown("""
<div style="background:#FFF9F0; border-radius:12px; padding:16px 20px; margin-top:24px;
  font-size:0.85rem; color:#636E72; border-left:4px solid #FFE66D;">
<strong>📢 ご注意</strong><br>
投資の具体的なアドバイスについてはお答えできません。<br>
また、外部の証券会社に関するサポートは、各社のサポート窓口にお問い合わせください。
</div>
""", unsafe_allow_html=True)


# ─────────────────────────────────────────────────
# ルーター（メインから呼ばれる）
# ─────────────────────────────────────────────────
def render_legal_page(sub: str = "privacy"):
    mapping = {
        "privacy":    ("🔒 プライバシーポリシー", render_privacy_policy),
        "disclaimer": ("⚠️ 免責事項",           render_disclaimer),
        "tokushoho":  ("📋 特定商取引法表記",    render_tokushoho),
        "contact":    ("✉️ お問い合わせ",        render_contact),
    }

    st.markdown("""
<style>
.legal-tab-bar {
    display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;
}
.legal-tab {
    padding: 6px 16px; border-radius: 50px; font-size: 0.85rem;
    font-weight: 700; text-decoration: none !important;
    background: #f5f5f5; color: #555 !important; border: 2px solid #eee;
    transition: all 0.15s;
}
.legal-tab:hover { background: #FFE66D; border-color: #FFE66D; color: #222 !important; }
.legal-tab.active { background: #FF6B6B; color: white !important; border-color: #FF6B6B; }
</style>
<div class="legal-tab-bar">
""", unsafe_allow_html=True)

    for key, (label, _) in mapping.items():
        active = "active" if key == sub else ""
        st.markdown(
            f'<a href="?page=legal&sub={key}" target="_self" class="legal-tab {active}">{label}</a>',
            unsafe_allow_html=True
        )
    st.markdown("</div>", unsafe_allow_html=True)

    if sub in mapping:
        mapping[sub][1]()
    else:
        render_privacy_policy()
