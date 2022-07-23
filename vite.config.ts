import {defineConfig, loadEnv, splitVendorChunkPlugin} from 'vite'
import vue from '@vitejs/plugin-vue'
import {createHtmlPlugin} from 'vite-plugin-html'
// https://vitejs.dev/config/

export default defineConfig((mode: any) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            vue(),
            splitVendorChunkPlugin(),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        title: env.VITE_APP_TITLE ?? 'Vite App',
                    }
                }
            })
        ]
    }
})
