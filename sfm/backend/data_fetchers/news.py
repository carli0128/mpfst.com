import feedparser
from typing import List

def get_news(rss: str = "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
             max_items: int = 5) -> List[dict]:
    feed  = feedparser.parse(rss)
    items = feed["entries"][:max_items]
    return [
        {
            "title": i.title,
            "link":  i.link,
            "date":  i.published,
            "summary": i.summary,
        }
        for i in items
    ]