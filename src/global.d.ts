declare global {
    interface Window {
        REMARK42?: {
            changeTheme?: (theme: string) => void;
        };
        remark_config?: {
            host: string;
            site_id: string;
            components?: string[];
            show_rss_subscription?: boolean;
            theme?: string;
            url?: string;
            page_id?: string;
        };
    }
}

export { };