import requests
from bs4 import BeautifulSoup
import csv
import time
import re
import random
from googlesearch import search  # New library

# --- Configuration ---
TARGET_KEYWORDS = [
    'business coach contact email',
    'fitness consultant book call',
    'life coach gmail.com',
    'marketing consultant "schedule a call"',
    'executive coach "work with me"'
]

OUTPUT_FILE = "coach_leads.csv"
LEADS_TO_FIND = 30 
DELAY_MIN = 2
DELAY_MAX = 5

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def search_google(query, num_results=10):
    print(f"🔍 Searching for: {query}")
    try:
        # returns a generator, convert to list
        # We need to iterate over the generator manually to control count
        results = []
        for url in search(query, num_results=num_results):
            results.append(url)
            if len(results) >= num_results:
                break
        return results
    except Exception as e:
        print(f"❌ Search Error: {e}")
        return []

def extract_email(text):
    """Finds emails in text using regex."""
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = re.findall(email_pattern, text)
    # Filter out common junk emails
    clean_emails = [e for e in emails if not any(x in e.lower() for x in ['example.com', 'wix.com', 'sentry.io', 'email.com'])]
    return clean_emails[0] if clean_emails else None

def analyze_site(url):
    """Visits a site to find email and basic issues."""
    try:
        print(f"👉 Visiting: {url}")
        response = requests.get(url, headers=HEADERS, timeout=10)
        
        if response.status_code != 200:
            return None

        # Filter out "hobbyist" domains (wordpress.com, wixsite.com)
        if "wordpress.com" in url or "wixsite.com" in url or "blogspot.com" in url:
            print(f"   Skipping (Free Domain): {url}")
            return None

        text_content = response.text
        soup = BeautifulSoup(text_content, 'html.parser')
        
        # 1. DETECT PIXEL (High Value Signal)
        has_pixel = False
        if "fbq('init')" in text_content or "fbevents.js" in text_content:
            has_pixel = True
            print("   💰 PIXEL DETECTED (Spending Money!)")
        
        # 2. Find Email
        email = extract_email(soup.get_text())
        
        # If no email in text, check 'mailto:' links
        if not email:
            for a in soup.find_all('a', href=True):
                if 'mailto:' in a['href']:
                    email = a['href'].replace('mailto:', '').split('?')[0]
                    break
        
        # 3. Identify "Issues" (Heuristics)
        issues = []
        
        # Check title length
        title = soup.title.string if soup.title else ""
        if not title or len(title) < 10:
            issues.append("Weak or missing page title")
            
        # Check for responsive meta tag
        viewport = soup.find('meta', attrs={'name': 'viewport'})
        if not viewport:
            issues.append("Likely not mobile responsive (no viewport tag)")
            
        # Check if using generic builders (often ugly)
        if "wix.com" in text_content.lower():
            issues.append("Built on Wix (generic)")
        elif "clickfunnels" in text_content.lower():
            issues.append("ClickFunnels Template")
            
        return {
            "url": url,
            "title": title.strip() if title else "No Title",
            "email": email,
            "has_pixel": "YES" if has_pixel else "No",
            "issues": "; ".join(issues) if issues else "Basic check passed"
        }

    except Exception as e:
        print(f"   Skipping (Error): {e}")
        return None

def main():
    all_leads = []
    
    for query in TARGET_KEYWORDS:
        urls = search_google(query, num_results=10)
        
        for url in urls:
            if len(all_leads) >= LEADS_TO_FIND:
                break
                
            lead_data = analyze_site(url)
            
            if lead_data and lead_data['email']: # Only save if we found an email
                print(f"✅ FOUND LEAD: {lead_data['email']}")
                all_leads.append(lead_data)
            
            # Respectful delay
            time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
            
        if len(all_leads) >= LEADS_TO_FIND:
            break
            
    # Save to CSV
    if all_leads:
        with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=["url", "title", "email", "has_pixel", "issues"])
            writer.writeheader()
            writer.writerows(all_leads)
        print(f"\n🎉 Done! Saved {len(all_leads)} leads to {OUTPUT_FILE}")
    else:
        print("\n😔 No leads found this time.")

if __name__ == "__main__":
    main()
