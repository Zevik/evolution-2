# פלטפורמת למידה אינטראקטיבית

אפליקציית Next.js מושלמת ללמידה אינטראקטיבית עם AI, גמיפיקציה ומעקב התקדמות מתקדם. האפליקציה מיועדת לפריסה בנטליפיי ומספקת חוויית למידה מותאמת אישית.

## ✨ תכונות מרכזיות

### 🎯 מערכת למידה מתקדמת
- **מסלולי למידה מותאמים אישית** - בחירה בין 3 רמות קושי
- **מבחן מיקום אוטומטי** - המלצה על המסלול המתאים ביותר
- **מודולים אינטראקטיביים** - תכנים עשירים עם אנימציות
- **מעקב התקדמות בזמן אמת** - סטטיסטיקות מפורטות וניתוח

### 🎮 גמיפיקציה ומוטיבציה
- **מערכת נקודות וכבוד** (XP) - זכיית נקודות על כל פעילות
- **רמות ושלבים** - התקדמות הדרגתית במערכת רמות
- **הישגים ותגים** - פתיחת הישגים על בסיס ביצועים
- **רצפי למידה** - עידוד למידה יומית
- **לוח מובילים** - תחרותיות בריאה

### 🔊 חוויית משתמש עשירה
- **אפקטי קול אינטראקטיביים** - משוב קולי עם Web Audio API
- **אנימציות מתקדמות** - Framer Motion לחוויה חלקה
- **עיצוב רספונסיבי** - תואם לכל המכשירים
- **ממשק בעברית** - תמיכה מלאה בעברית וכיוון RTL
- **נגישות** - עמידה בתקני נגישות מתקדמים

### 📊 ניתוח וביצועים
- **דוחות התקדמות** - מעקב מפורט אחר הלמידה
- **ניתוח חולשות וחוזקות** - זיהוי אזורים לשיפור
- **זמן למידה** - מעקב אחר זמן שהושקע
- **הצלחה ביעדים** - מדידת עמידה ביעדים אישיים

## 🛠 טכנולוגיות

### Frontend
- **Next.js 14** - React framework עם App Router
- **TypeScript** - Type safety מלא
- **Tailwind CSS** - עיצוב מהיר ויעיל
- **Framer Motion** - אנימציות מתקדמות
- **Lucide React** - אייקונים מודרניים

### State Management
- **Zustand** - ניהול state פשוט ויעיל
- **Persist middleware** - שמירת נתונים בלוקאל סטורג׳

### UI/UX
- **React DnD** - Drag & Drop אינטראקטיבי
- **React Spring** - אנימציות חלקות
- **Canvas API** - גרפיקה ויזואלית
- **Web Audio API** - אפקטי קול

## 🚀 התקנה והרצה

### דרישות מערכת
- Node.js 18+ 
- npm או yarn
- Git

### התקנה מקומית

```bash
# שכפול הפרויקט
git clone <repository-url>
cd interactive-learning-platform

# התקנת dependencies
npm install

# הרצה במצב פיתוח
npm run dev
```

האפליקציה תרוץ על: `http://localhost:3000`

### פקודות זמינות

```bash
# פיתוח
npm run dev          # הרצה במצב פיתוח

# בנייה
npm run build        # בניית האפליקציה לפרודקשן
npm run start        # הרצת build מקומי

# בדיקות איכות
npm run lint         # ESLint
npm run type-check   # TypeScript validation
```

## 🌐 פריסה לנטליפיי

### הגדרת הפרויקט בנטליפיי

1. **חיבור הפרויקט**
   ```bash
   # התחברות לנטליפיי
   npm install -g netlify-cli
   netlify login
   netlify init
   ```

2. **הגדרת Build**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18`

3. **משתני סביבה**
   ```
   NODE_VERSION=18
   NPM_VERSION=9
   ```

### פריסה אוטומטית
הפרויקט מוגדר עם:
- ✅ Static export מלא
- ✅ אופטימיזציה לנטליפיי
- ✅ Redirects אוטומטיים
- ✅ Headers אבטחה
- ✅ Cache optimization

## 📁 מבנה הפרויקט

```
app/
├── components/          # קומפוננטות React
│   ├── ui/             # קומפוננטות UI בסיסיות
│   ├── providers/      # Context providers
│   ├── WelcomeModal.tsx
│   ├── LearningPathSelector.tsx
│   ├── ProgressDashboard.tsx
│   ├── ModuleCard.tsx
│   └── AchievementsList.tsx
├── store/              # Zustand stores
│   └── learningStore.ts
├── globals.css         # סטיילים גלובליים
├── layout.tsx          # Layout ראשי
├── page.tsx           # דף בית
├── not-found.tsx      # דף 404
└── providers.tsx      # Providers עיקריים

public/                # קבצים סטטיים
netlify.toml          # הגדרות נטליפיי
next.config.js        # הגדרות Next.js
tailwind.config.js    # הגדרות Tailwind
package.json          # Dependencies
```

## 🎨 מדריך עיצוב

### צבעים
- **Primary**: כחול-סגול (#3b82f6 → #8b5cf6)
- **Success**: ירוק (#22c55e)
- **Warning**: כתום (#f59e0b)  
- **Error**: אדום (#ef4444)

### טיפוגרפיה
- **עברית**: Heebo (Google Fonts)
- **אנגלית**: Inter (Google Fonts)
- **יריד**: Sans-serif fallback

### אנימציות
- **Entrance**: fadeIn, slideUp, scaleIn
- **Hover**: subtle scale, color transitions
- **Loading**: pulse, skeleton screens

## 🔧 התאמה אישית

### הוספת מודול חדש
```typescript
// app/store/learningStore.ts
const newModule: LearningModule = {
  id: 4,
  title: 'כותרת המודול',
  description: 'תיאור המודול',
  difficulty: 'beginner',
  estimatedTime: 30,
  prerequisites: [1, 2],
  lessons: [],
  isUnlocked: false,
  progress: 0
}
```

### הוספת הישג חדש
```typescript
const newAchievement: Achievement = {
  id: 'new-achievement',
  title: 'הישג חדש',
  description: 'תיאור ההישג',
  icon: '🏆',
  category: 'progress'
}
```

## 🔐 אבטחה

- **Headers אבטחה**: הגנה מפני XSS, Clickjacking
- **Content Security Policy**: הגבלת תוכן חיצוני
- **HTTPS Only**: פריסה מאובטחת בלבד
- **Input validation**: וליידציה של כל הקלטות המשתמש

## 📱 תאימות

### דפדפנים נתמכים
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### מכשירים
- ✅ Desktop (1024px+)
- ✅ Tablet (768px-1023px)
- ✅ Mobile (320px-767px)

## 🐛 Debug ובעיות נפוצות

### בעיות התקנה
```bash
# מחיקת node_modules וחידוש
rm -rf node_modules package-lock.json
npm install

# בדיקת גרסת Node
node --version  # צריך להיות 18+
```

### בעיות build
```bash
# בדיקת שגיאות TypeScript
npm run type-check

# בדיקת Linting
npm run lint

# בניה מקומית לבדיקה
npm run build
```

## 🤝 תרומה לפרויקט

1. Fork הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📄 רישיון

הפרויקט מופץ תחת רישיון MIT. ראה `LICENSE` לפרטים נוספים.

## 🎯 תכונות עתידיות

- [ ] **מערכת צ'אט AI** - עזרה אישית חכמה
- [ ] **למידה חברתית** - קבוצות לימוד ותחרויות
- [ ] **תוכן וידאו** - שילוב סרטוני למידה
- [ ] **אפליקציית מובייל** - React Native app
- [ ] **ניתוח מתקדם** - ML לחיזוי התקדמות
- [ ] **אינטגרציה LMS** - חיבור למערכות קיימות

## 📞 צור קשר

- **מפתח**: Your Name
- **אימייל**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

---

**פלטפורמת הלמידה האינטראקטיבית** - חינוך דיגיטלי מתקדם לעידן החדש 🚀 