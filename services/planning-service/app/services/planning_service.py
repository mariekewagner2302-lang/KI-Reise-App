from dotenv import load_dotenv
load_dotenv()

from openai import OpenAI
import os
import json
from typing import List, Dict

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_trip_plan(destination: str, budget: int, duration: int, interests: List[str]) -> Dict:
    """
    Generiert einen personalisierten Reiseplan mit OpenAI GPT-4
    """
    
    # Prompt Engineering
    prompt = f"""Du bist ein erfahrener Reiseplaner. Erstelle einen detaillierten {duration}-Tages-Reiseplan für {destination}.

Budget: {budget}€
Interessen: {', '.join(interests)}

Erstelle einen Tagesplan mit:
- Aktivitäten mit genauen Uhrzeiten (z.B. 09:00, 14:00)
- Realistische Sehenswürdigkeiten und Orte in {destination}
- Geschätzte Kosten pro Aktivität in Euro
- Berücksichtige die Interessen: {', '.join(interests)}
- Bleibe unter dem Budget von {budget}€

Antworte NUR mit validem JSON in diesem Format:
{{
  "destination": "{destination}",
  "total_cost": 450,
  "days": [
    {{
      "day": 1,
      "title": "Ankunft & Erkundung",
      "activities": [
        {{
          "time": "10:00",
          "name": "Konkreter Ort/Aktivität",
          "type": "culture",
          "cost": 15,
          "description": "Kurze Beschreibung"
        }}
      ]
    }}
  ]
}}

Wichtig:
- Nutze echte Orte in {destination}
- type kann sein: culture, food, shopping, nature, entertainment, hotel
- Kosten realistisch für {destination}
- Gesamt-Budget nicht überschreiten
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Du bist ein professioneller Reiseplaner. Antworte immer mit validem JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2000
        )
        
        # Response extrahieren
        content = response.choices[0].message.content
        
        # JSON parsen
        # Entferne mögliche Markdown-Blöcke
        if content.startswith("```json"):
            content = content.replace("```json", "").replace("```", "").strip()
        
        trip_data = json.loads(content)
        
        return {
            "success": True,
            "data": trip_data
        }
        
    except json.JSONDecodeError as e:
        print(f"JSON Parse Error: {e}")
        print(f"Response was: {content}")
        return {
            "success": False,
            "error": "Failed to parse AI response",
            "raw_response": content[:200]
        }
    except Exception as e:
        print(f"OpenAI Error: {e}")
        return {
            "success": False,
            "error": str(e)
        }
