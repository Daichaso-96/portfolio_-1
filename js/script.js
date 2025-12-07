
// スクロールアニメーション
function checkScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillItems = document.querySelectorAll('.skill-item');
    
    // タイムラインのアニメーション
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // 画面の80%の位置にきたら表示
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('visible');
            
            // データ属性から会社名と年を取得してコンソールに出力（開発用）
            const year = item.getAttribute('data-year');
            const company = item.getAttribute('data-company');
            console.log(`表示: ${year}年 - ${company}`);
        }
    });
    
    // スキルのアニメーション
    skillItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8 && !item.classList.contains('animated')) {
            item.classList.add('animated');
            animateSkillStars(item);
        }
    });
}

// スキルの星を徐々に表示するアニメーション
function animateSkillStars(skillItem) {
    const starsContainer = skillItem.querySelector('.skill-stars');
    const skillLevel = parseInt(skillItem.getAttribute('data-skill-level')) || 3;
    const maxStars = 5;
    
    // 最初に空の星を全て表示
    for (let i = 0; i < maxStars; i++) {
        const star = document.createElement('span');
        star.textContent = '☆';
        star.classList.add('star');
        if (i < skillLevel) {
            star.classList.add('will-fill');
        } else {
            star.classList.add('empty-star');
        }
        starsContainer.appendChild(star);
    }
    
    // スキルレベルに応じて星を塗りつぶしていく
    const starsToFill = starsContainer.querySelectorAll('.will-fill');
    starsToFill.forEach((star, index) => {
        setTimeout(() => {
            star.classList.add('filling');
            star.textContent = '★';
        }, index * 200); // 200msごとに一つずつ塗りつぶし
    });
}

// ページ読み込み時のアニメーション
function initPageAnimations() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        // 初期状態を設定
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        
        // 順次表示
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100 + 50);
    });
}

// 希望職種セクションのホバーエフェクト強化
function initPositionHoverEffects() {
    const positionItems = document.querySelectorAll('.position-item');
    
    positionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#764ba2';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#667eea';
        });
    });
}

// スムーススクロール機能（オプション）
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// タイムライン項目の詳細情報を表示（開発用）
function logTimelineInfo() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    console.log(`職務経歴の数: ${timelineItems.length}`);
    
    timelineItems.forEach((item, index) => {
        const year = item.getAttribute('data-year');
        const company = item.getAttribute('data-company');
        console.log(`${index + 1}. ${year}年 - ${company}`);
    });
}

// 初期化処理
document.addEventListener('DOMContentLoaded', function() {
    // 初回チェック
    checkScroll();
    
    // ページアニメーション開始
    initPageAnimations();
    
    // 希望職種のホバーエフェクト初期化
    initPositionHoverEffects();
    
    // スムーススクロール初期化
    initSmoothScroll();
    
    // タイムライン情報をログ出力
    logTimelineInfo();
    
    console.log('職務経歴書ポートフォリオが読み込まれました');
});

// スクロールイベントリスナー
window.addEventListener('scroll', checkScroll);

// リサイズ時の再チェック
window.addEventListener('resize', checkScroll);