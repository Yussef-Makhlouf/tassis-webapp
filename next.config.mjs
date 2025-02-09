import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ik.imagekit.io'],
    },
};

export default withNextIntl(nextConfig);
