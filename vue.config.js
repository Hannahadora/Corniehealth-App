module.exports = {
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            args[0].title = "CornieHealth";
            return args;
        });
    },
};

// module.exports = {
//   css: {
//     loaderOptions: {
//       sass: {
//         prependData: `@import "@/styles/_variables.scss";`
//       }
//     }
//   }
// };

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/styles/_variables.scss";`,
            },
        },
    },
};