export class HomepageRevalidationService {
  static async trigger(): Promise<boolean> {
    try {
      const response = await fetch("/api/revalidate-homepage", {
        method: "POST",
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        console.warn(
          "Homepage revalidation failed:",
          payload?.message ?? response.statusText,
        );
        return false;
      }

      return true;
    } catch (error) {
      console.warn("Homepage revalidation request failed:", error);
      return false;
    }
  }
}
