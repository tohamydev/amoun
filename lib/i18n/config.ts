import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

export const defaultNS = "common"
export const fallbackLng = "en"
export const languages = ["en", "ar"]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    lng: fallbackLng,
    debug: false,
    ns: ["common"],
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    resources: {
      en: {
        common: {
          nav: {
            home: "Home",
            products: "Products",
            aboutUs: "About Us",
            services: "Services",
            partners: "Partners",
            contactUs: "Contact Us",
          },
          home: {
            title: "Make the Best Deal with Us",
            subtitle: "Your trusted partner in chemical solutions",
            exploreProducts: "Explore Products",
            contactUs: "Contact Us",
          },
          services: {
            title: "Our Services",
            manufacturing: {
              title: "Chemical Manufacturing",
              description: "State-of-the-art facilities producing high-quality chemicals for various industries.",
            },
            supplyChain: {
              title: "Supply Chain Solutions",
              description: "Efficient and reliable distribution network ensuring timely delivery of products.",
            },
            customFormulations: {
              title: "Custom Formulations",
              description: "Tailored chemical solutions to meet your specific requirements and challenges.",
            },
          },
          products: {
            title: "Our Products",
            description: "Explore our wide range of high-quality chemical products",
            categoryDescription: "Browse our selection of {{category}} products",
            emailInquiry: "Email Inquiry",
            whatsappInquiry: "WhatsApp Inquiry",
            noCategories: "No categories available.",
            noProductsInCategory: "No products available in this category.",
          },
          about: {
            title: "About Us",
            mission: {
              title: "Our Mission",
              description:
                "At Amoun Chemicals, we strive to provide innovative and sustainable chemical solutions to meet the evolving needs of industries worldwide. Our mission is to contribute to the growth and success of our clients through high-quality products and exceptional service.",
            },
            values: {
              title: "Our Values",
              items: [
                "Commitment to quality and safety",
                "Innovation and continuous improvement",
                "Environmental responsibility",
                "Customer-centric approach",
                "Integrity and transparency",
              ],
            },
          },
          partners: {
            title: "Our Partners",
            description:
              "We collaborate with industry leaders to deliver exceptional chemical solutions and drive innovation in various sectors.",
          },
          contact: {
            title: "Contact Us",
            form: {
              name: "Name",
              email: "Email",
              message: "Message",
              send: "Send Message",
              sending: "Sending...",
              success: "Thank you for your message. We will get back to you soon!",
              error: "There was an error sending your message. Please try again.",
              contactMethod: "Contact Method",
              emailOption: "Email",
              whatsappOption: "WhatsApp",
            },
            info: {
              address: "123 Chemical Street, Cairo, Egypt",
              phone: "+201004724510",
              email: "info@amounchemicals.com",
            },
          },
        },
      },
      ar: {
        common: {
          nav: {
            home: "الرئيسية",
            products: "المنتجات",
            aboutUs: "من نحن",
            services: "خدماتنا",
            partners: "شركاؤنا",
            contactUs: "اتصل بنا",
          },
          home: {
            title: "احصل على أفضل صفقة معنا",
            subtitle: "شريكك الموثوق في الحلول الكيميائية",
            exploreProducts: "استكشف المنتجات",
            contactUs: "اتصل بنا",
          },
          services: {
            title: "خدماتنا",
            manufacturing: {
              title: "تصنيع المواد الكيميائية",
              description: "مرافق حديثة لإنتاج مواد كيميائية عالية الجودة لمختلف الصناعات.",
            },
            supplyChain: {
              title: "حلول سلسلة التوريد",
              description: "شبكة توزيع فعالة وموثوقة تضمن التسليم في الوقت المناسب للمنتجات.",
            },
            customFormulations: {
              title: "تركيبات مخصصة",
              description: "حلول كيميائية مخصصة لتلبية متطلباتك وتحدياتك المحددة.",
            },
          },
          products: {
            title: "منتجاتنا",
            description: "استكشف مجموعتنا الواسعة من المنتجات الكيميائية عالية الجودة",
            categoryDescription: "تصفح مجموعة منتجاتنا من {{category}}",
            emailInquiry: "استفسار عبر البريد الإلكتروني",
            whatsappInquiry: "استفسار عبر واتساب",
            noCategories: "لا توجد فئات متاحة.",
            noProductsInCategory: "لا توجد منتجات متاحة في هذه الفئة.",
          },
          about: {
            title: "من نحن",
            mission: {
              title: "مهمتنا",
              description:
                "في أمون للكيماويات، نسعى جاهدين لتقديم حلول كيميائية مبتكرة ومستدامة لتلبية الاحتياجات المتطورة للصناعات في جميع أنحاء العالم. مهمتنا هي المساهمة في نمو ونجاح عملائنا من خلال المنتجات عالية الجودة والخدمة الاستثنائية.",
            },
            values: {
              title: "قيمنا",
              items: [
                "الالتزام بالجودة والسلامة",
                "الابتكار والتحسين المستمر",
                "المسؤولية البيئية",
                "نهج يركز على العملاء",
                "النزاهة والشفافية",
              ],
            },
          },
          partners: {
            title: "شركاؤنا",
            description:
              "نتعاون مع الشركات الرائدة في الصناعة لتقديم حلول كيميائية استثنائية ودفع الابتكار في مختلف القطاعات.",
          },
          contact: {
            title: "اتصل بنا",
            form: {
              name: "الاسم",
              email: "البريد الإلكتروني",
              message: "الرسالة",
              send: "إرسال الرسالة",
              sending: "جاري الإرسال...",
              success: "شكراً لرسالتك. سنعود إليك قريباً!",
              error: "حدث خطأ في إرسال رسالتك. يرجى المحاولة مرة أخرى.",
              contactMethod: "طريقة التواصل",
              emailOption: "البريد الإلكتروني",
              whatsappOption: "واتساب",
            },
            info: {
              address: "١٢٣ شارع الكيماويات، القاهرة، مصر",
              phone: "٢٠١٠٠٤٧٢٤٥١٠+",
              email: "info@amounchemicals.com",
            },
          },
        },
      },
    },
  })

export default i18n
