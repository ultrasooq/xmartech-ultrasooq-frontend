import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '../services/locale';

export default getRequestConfig(async () => {
    const locale = await getUserLocale();

    return {
        locale,
        messages: (await import(`../../translations/${locale}.json`)).default,
        timeZone: 'UTC' // Add timeZone to prevent environment mismatches
    };
});