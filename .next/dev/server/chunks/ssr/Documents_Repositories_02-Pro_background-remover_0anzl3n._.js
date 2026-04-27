module.exports = [
"[project]/Documents/Repositories/02-Pro/background-remover/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Documents/Repositories/02-Pro/background-remover/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
;
}),
"[project]/Documents/Repositories/02-Pro/background-remover/components/ui/progress.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Progress",
    ()=>Progress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/lib/utils.ts [app-ssr] (ecmascript)");
;
;
const Progress = ({ value, max = 100, className })=>{
    const percentage = value / max * 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-primary h-full rounded-full transition-all duration-300",
            style: {
                width: `${percentage}%`
            }
        }, void 0, false, {
            fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/ui/progress.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/ui/progress.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageUploader",
    ()=>ImageUploader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ImageUploader({ onImageUpload }) {
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFileChange = (event)=>{
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please upload an image smaller than 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e)=>{
                onImageUpload(e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUpload = ()=>fileInputRef.current?.click();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 space-y-4 cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/[0.02] dark:hover:bg-primary/[0.01]",
        onClick: handleUpload,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UploadIcon"], {
                    className: "w-6 h-6"
                }, void 0, false, {
                    fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-foreground",
                        children: "Upload Image"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground font-medium",
                        children: "Drag and drop or click to browse"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                ref: fileInputRef,
                onChange: handleFileChange,
                accept: "image/*",
                className: "hidden",
                "aria-label": "Upload image"
            }, void 0, false, {
                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                className: "mt-2 rounded-xl font-bold border-2 transition-all",
                children: "Select File"
            }, void 0, false, {
                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Repositories/02-Pro/background-remover/components/ui/aspect-ratio.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AspectRatio",
    ()=>AspectRatio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$aspect$2d$ratio$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/@radix-ui/react-aspect-ratio/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
const AspectRatio = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$aspect$2d$ratio$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
;
}),
"[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImagePreview",
    ()=>ImagePreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$aspect$2d$ratio$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/components/ui/aspect-ratio.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function ImagePreview({ title, imageSrc, isProcessed = false, isLoading = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$aspect$2d$ratio$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AspectRatio"], {
                    ratio: 1 / 1,
                    children: imageSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-full w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 opacity-[0.03] dark:opacity-[0.05]",
                                style: {
                                    backgroundImage: 'radial-gradient(#000 10%, transparent 10%), radial-gradient(#000 10%, transparent 10%)',
                                    backgroundPosition: '0 0, 4px 4px',
                                    backgroundSize: '8px 8px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                                lineNumber: 30,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: imageSrc,
                                alt: title,
                                fill: true,
                                className: "object-contain p-4 transform transition-transform duration-500 group-hover:scale-[1.02]",
                                sizes: "(max-width: 768px) 100vw, 400px",
                                priority: !isProcessed
                            }, void 0, false, {
                                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, this) : isProcessed ? isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full flex-col items-center justify-center space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse",
                                children: "Processing"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                                lineNumber: 51,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                        lineNumber: 49,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full items-center justify-center text-xs font-bold text-zinc-400 dark:text-zinc-600 italic uppercase tracking-widest",
                        children: "Awaiting processing"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                        lineNumber: 54,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-full items-center justify-center text-xs font-bold text-zinc-400 dark:text-zinc-600 italic uppercase tracking-widest",
                        children: "Awaiting upload"
                    }, void 0, false, {
                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                        lineNumber: 59,
                        columnNumber: 14
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageProcessor",
    ()=>ImageProcessor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/@radix-ui/react-icons/dist/react-icons.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/components/ui/progress.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$image$2d$uploader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/components/image-uploader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$image$2d$preview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Repositories/02-Pro/background-remover/components/image-preview.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function ImageProcessor() {
    const [originalImage, setOriginalImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [processedImage, setProcessedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const handleImageUpload = (dataUrl)=>{
        setOriginalImage(dataUrl);
        setProcessedImage(null);
    };
    const handleRemoveBackground = async ()=>{
        if (!originalImage) return;
        setIsLoading(true);
        setProgress(0);
        try {
            const img = document.createElement('img');
            img.src = originalImage;
            await new Promise((resolve, reject)=>{
                img.onload = resolve;
                img.onerror = reject;
            });
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Unable to get canvas context');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            setProgress(20);
            const edgeData = detectEdges(data, canvas.width, canvas.height);
            setProgress(40);
            const foregroundMask = colorBasedSegmentation(data, canvas.width, canvas.height);
            setProgress(60);
            const combinedMask = combineMasks(edgeData, foregroundMask, canvas.width, canvas.height);
            setProgress(80);
            applyMask(data, combinedMask);
            setProgress(90);
            refineEdges(data, canvas.width, canvas.height);
            ctx.putImageData(imageData, 0, 0);
            setProcessedImage(canvas.toDataURL());
            setProgress(100);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Background removed!");
        } catch (error) {
            console.error('Error processing image:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to process image");
        } finally{
            setIsLoading(false);
        }
    };
    const handleDownload = ()=>{
        if (processedImage) {
            const link = document.createElement('a');
            link.href = processedImage;
            link.download = 'processed_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const handleReset = ()=>{
        setOriginalImage(null);
        setProcessedImage(null);
        setProgress(0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: !originalImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$image$2d$uploader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImageUploader"], {
            onImageUpload: handleImageUpload
        }, void 0, false, {
            fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
            lineNumber: 90,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in fade-in zoom-in duration-500",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$image$2d$preview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImagePreview"], {
                            title: "Original",
                            imageSrc: originalImage
                        }, void 0, false, {
                            fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$image$2d$preview$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImagePreview"], {
                            title: "Processed",
                            imageSrc: processedImage,
                            isProcessed: true,
                            isLoading: isLoading
                        }, void 0, false, {
                            fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 pt-6",
                    children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-[10px] font-black text-primary uppercase tracking-widest",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Removing Background..."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                                        lineNumber: 107,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            progress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                                        lineNumber: 108,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                                lineNumber: 106,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Progress"], {
                                value: progress,
                                className: "h-2 rounded-full bg-zinc-100"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                                lineNumber: 110,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                        lineNumber: 105,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3",
                        children: !processedImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleRemoveBackground,
                            className: "w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-white transition-all rounded-2xl shadow-xl shadow-primary/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MagicWandIcon"], {
                                    className: "mr-2 h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                                    lineNumber: 119,
                                    columnNumber: 21
                                }, this),
                                "Remove Background"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                            lineNumber: 115,
                            columnNumber: 19
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleDownload,
                                    className: "w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-white transition-all rounded-2xl shadow-xl shadow-primary/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DownloadIcon"], {
                                            className: "mr-2 h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                                            lineNumber: 128,
                                            columnNumber: 23
                                        }, this),
                                        "Download HD PNG"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                                    lineNumber: 124,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    onClick: handleReset,
                                    className: "w-full h-12 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Repositories$2f$02$2d$Pro$2f$background$2d$remover$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$icons$2f$dist$2f$react$2d$icons$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReloadIcon"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                                            lineNumber: 136,
                                            columnNumber: 23
                                        }, this),
                                        "Upload Different Image"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                                    lineNumber: 131,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                            lineNumber: 123,
                            columnNumber: 19
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                        lineNumber: 113,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
                    lineNumber: 103,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
            lineNumber: 92,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/Repositories/02-Pro/background-remover/components/image-processor.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
// ... (Rest of the processing functions remain same)
function detectEdges(data, width, height) {
    const grayscale = new Uint8Array(width * height);
    for(let i = 0; i < data.length; i += 4){
        grayscale[i / 4] = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    }
    const edges = new Uint8Array(width * height);
    const sobelX = [
        -1,
        0,
        1,
        -2,
        0,
        2,
        -1,
        0,
        1
    ];
    const sobelY = [
        -1,
        -2,
        -1,
        0,
        0,
        0,
        1,
        2,
        1
    ];
    for(let y = 1; y < height - 1; y++){
        for(let x = 1; x < width - 1; x++){
            let pixelX = 0, pixelY = 0;
            for(let j = -1; j <= 1; j++){
                for(let i = -1; i <= 1; i++){
                    const pixel = grayscale[(y + j) * width + (x + i)];
                    pixelX += pixel * sobelX[(j + 1) * 3 + (i + 1)];
                    pixelY += pixel * sobelY[(j + 1) * 3 + (i + 1)];
                }
            }
            edges[y * width + x] = Math.min(255, Math.sqrt(pixelX * pixelX + pixelY * pixelY));
        }
    }
    return edges;
}
function colorBasedSegmentation(data, width, height) {
    const mask = new Uint8Array(width * height);
    const samples = sampleBackgroundColors(data, width, height);
    const threshold = 30;
    for(let i = 0; i < data.length; i += 4){
        const r = data[i], g = data[i + 1], b = data[i + 2];
        let isForeground = true;
        for (const sample of samples){
            const dr = r - sample[0];
            const dg = g - sample[1];
            const db = b - sample[2];
            const distance = Math.sqrt(dr * dr + dg * dg + db * db);
            if (distance < threshold) {
                isForeground = false;
                break;
            }
        }
        mask[i / 4] = isForeground ? 255 : 0;
    }
    return mask;
}
function sampleBackgroundColors(data, width, height) {
    const samples = [];
    for(let i = 0; i < width; i += width / 10){
        samples.push([
            data[Math.floor(i) * 4],
            data[Math.floor(i) * 4 + 1],
            data[Math.floor(i) * 4 + 2]
        ]);
        samples.push([
            data[(height - 1) * width * 4 + Math.floor(i) * 4],
            data[(height - 1) * width * 4 + Math.floor(i) * 4 + 1],
            data[(height - 1) * width * 4 + Math.floor(i) * 4 + 2]
        ]);
    }
    for(let i = 0; i < height; i += height / 10){
        samples.push([
            data[Math.floor(i) * width * 4],
            data[Math.floor(i) * width * 4 + 1],
            data[Math.floor(i) * width * 4 + 2]
        ]);
        samples.push([
            data[Math.floor(i) * width * 4 + (width - 1) * 4],
            data[Math.floor(i) * width * 4 + (width - 1) * 4 + 1],
            data[Math.floor(i) * width * 4 + (width - 1) * 4 + 2]
        ]);
    }
    return samples;
}
function combineMasks(edgeData, foregroundMask, width, height) {
    const combinedMask = new Uint8Array(width * height);
    for(let i = 0; i < width * height; i++){
        combinedMask[i] = edgeData[i] > 30 || foregroundMask[i] > 0 ? 255 : 0;
    }
    return combinedMask;
}
function applyMask(data, mask) {
    for(let i = 0; i < mask.length; i++){
        data[i * 4 + 3] = mask[i];
    }
}
function refineEdges(data, width, height) {
    for(let y = 1; y < height - 1; y++){
        for(let x = 1; x < width - 1; x++){
            const idx = (y * width + x) * 4;
            if (data[idx + 3] > 0 && data[idx + 3] < 255) {
                let sumAlpha = 0;
                let count = 0;
                for(let j = -1; j <= 1; j++){
                    for(let i = -1; i <= 1; i++){
                        if (i === 0 && j === 0) continue;
                        const neighborIdx = ((y + j) * width + (x + i)) * 4;
                        sumAlpha += data[neighborIdx + 3];
                        count++;
                    }
                }
                const avgAlpha = sumAlpha / count;
                data[idx + 3] = avgAlpha > 127 ? 255 : 0;
            }
        }
    }
}
}),
];

//# sourceMappingURL=Documents_Repositories_02-Pro_background-remover_0anzl3n._.js.map