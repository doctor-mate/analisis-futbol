#!/usr/bin/env python3
"""
SOY ANALISTA — PDF Report: Argentina Mundial 2026
==================================================
Full Tier 1 report (17 sections) with Soy Analista brand identity.
Adapted for macOS fonts (Georgia, Times New Roman, Courier New).
"""

import os
import textwrap
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus.flowables import Flowable


# ══════════════════════════════════════════════════════════════
# BRAND TOKENS
# ══════════════════════════════════════════════════════════════

class Brand:
    crema = HexColor("#F5F0E8")
    crema_oscura = HexColor("#EDE6D8")
    arena = HexColor("#D9CEBC")
    tierra = HexColor("#A69882")
    cafe = HexColor("#6B5B4D")
    cafe_oscuro = HexColor("#4A3E34")
    negro = HexColor("#1C1915")
    negro_suave = HexColor("#2C2822")
    tinta = HexColor("#3A3530")
    blanco = HexColor("#FEFCF8")
    rojo = HexColor("#C13628")
    rojo_claro = HexColor("#D94F42")
    dorado = HexColor("#B8922F")
    verde = HexColor("#3A7D44")
    azul = HexColor("#2E5E8C")

    @staticmethod
    def pct_color(pct):
        if pct >= 75: return Brand.rojo
        if pct >= 50: return Brand.dorado
        if pct >= 25: return Brand.azul
        return Brand.tierra


# ══════════════════════════════════════════════════════════════
# FONT REGISTRATION (macOS paths)
# ══════════════════════════════════════════════════════════════

FONT_DIR = "/System/Library/Fonts/Supplemental"

FONT_PATHS = {
    "Display": f"{FONT_DIR}/Georgia Bold.ttf",
    "DisplayItalic": f"{FONT_DIR}/Georgia Bold Italic.ttf",
    "Body": f"{FONT_DIR}/Georgia.ttf",
    "BodyBold": f"{FONT_DIR}/Georgia Bold.ttf",
    "BodyItalic": f"{FONT_DIR}/Georgia Italic.ttf",
    "BodyBoldItalic": f"{FONT_DIR}/Georgia Bold Italic.ttf",
    "Data": f"{FONT_DIR}/Courier New.ttf",
    "DataBold": f"{FONT_DIR}/Courier New Bold.ttf",
}

for name, path in FONT_PATHS.items():
    if os.path.exists(path):
        pdfmetrics.registerFont(TTFont(name, path))


# ══════════════════════════════════════════════════════════════
# PARAGRAPH STYLES
# ══════════════════════════════════════════════════════════════

def build_styles():
    styles = {}
    styles["h1"] = ParagraphStyle(
        "H1", fontName="Display", fontSize=28, leading=32,
        textColor=Brand.negro, spaceAfter=4,
    )
    styles["h1_light"] = ParagraphStyle(
        "H1Light", fontName="Display", fontSize=28, leading=32,
        textColor=Brand.blanco, spaceAfter=4,
    )
    styles["h2"] = ParagraphStyle(
        "H2", fontName="Display", fontSize=18, leading=22,
        textColor=Brand.negro, spaceAfter=8, spaceBefore=4,
    )
    styles["h3"] = ParagraphStyle(
        "H3", fontName="Display", fontSize=14, leading=18,
        textColor=Brand.negro, spaceAfter=6,
    )
    styles["h4"] = ParagraphStyle(
        "H4", fontName="Display", fontSize=11, leading=14,
        textColor=Brand.cafe_oscuro, spaceAfter=4,
    )
    styles["body"] = ParagraphStyle(
        "Body", fontName="Body", fontSize=9.5, leading=14.5,
        textColor=Brand.negro, alignment=TA_JUSTIFY, spaceAfter=7,
    )
    styles["body_italic"] = ParagraphStyle(
        "BodyItalic", fontName="BodyItalic", fontSize=9.5, leading=14.5,
        textColor=Brand.cafe, spaceAfter=7,
    )
    styles["small"] = ParagraphStyle(
        "Small", fontName="BodyItalic", fontSize=8, leading=11,
        textColor=Brand.tierra, spaceAfter=4,
    )
    styles["data"] = ParagraphStyle(
        "Data", fontName="Data", fontSize=8.5, leading=12,
        textColor=Brand.negro,
    )
    styles["data_large"] = ParagraphStyle(
        "DataLarge", fontName="DataBold", fontSize=18, leading=22,
        textColor=Brand.negro, alignment=TA_CENTER,
    )
    styles["data_accent"] = ParagraphStyle(
        "DataAccent", fontName="DataBold", fontSize=18, leading=22,
        textColor=Brand.rojo, alignment=TA_CENTER,
    )
    styles["caption"] = ParagraphStyle(
        "Caption", fontName="BodyItalic", fontSize=7.5, leading=10,
        textColor=Brand.tierra, alignment=TA_CENTER,
    )
    styles["section_num"] = ParagraphStyle(
        "SectionNum", fontName="Data", fontSize=9, leading=12,
        textColor=Brand.tierra,
    )
    styles["pullquote"] = ParagraphStyle(
        "Pullquote", fontName="BodyItalic", fontSize=10, leading=16,
        textColor=Brand.crema, alignment=TA_LEFT, spaceAfter=4,
    )
    styles["footer"] = ParagraphStyle(
        "Footer", fontName="BodyItalic", fontSize=7, leading=10,
        textColor=Brand.tierra, alignment=TA_RIGHT,
    )
    styles["brand_header"] = ParagraphStyle(
        "BrandHeader", fontName="Display", fontSize=10, leading=13,
        textColor=Brand.crema,
    )
    return styles

STYLES = build_styles()


# ══════════════════════════════════════════════════════════════
# CUSTOM FLOWABLES
# ══════════════════════════════════════════════════════════════

class EditorialRule(Flowable):
    def __init__(self, width=None):
        super().__init__()
        self.width = width or 170 * mm

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (self.width, 8)

    def draw(self):
        self.canv.setStrokeColor(Brand.negro)
        self.canv.setLineWidth(2)
        self.canv.line(0, 7, self.width, 7)
        self.canv.setStrokeColor(Brand.arena)
        self.canv.setLineWidth(0.5)
        self.canv.line(0, 0, self.width, 0)


class DiamondSeparator(Flowable):
    def __init__(self, width=None):
        super().__init__()
        self.width = width or 170 * mm

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (self.width, 12)

    def draw(self):
        mid = self.width / 2
        y = 6
        self.canv.setStrokeColor(Brand.arena)
        self.canv.setLineWidth(0.5)
        self.canv.line(0, y, mid - 8, y)
        self.canv.line(mid + 8, y, self.width, y)
        self.canv.setFillColor(Brand.rojo)
        self.canv.setStrokeColor(Brand.rojo)
        self.canv.saveState()
        self.canv.translate(mid, y)
        self.canv.rotate(45)
        self.canv.rect(-2.5, -2.5, 5, 5, fill=1)
        self.canv.restoreState()


class AccentLine(Flowable):
    def __init__(self, width=30*mm, height=2):
        super().__init__()
        self._width = width
        self._height = height

    def wrap(self, availWidth, availHeight):
        return (self._width, self._height + 4)

    def draw(self):
        self.canv.setFillColor(Brand.rojo)
        self.canv.rect(0, 2, self._width, self._height, fill=1, stroke=0)


class PercentileBar(Flowable):
    def __init__(self, label, value, pct, width=None):
        super().__init__()
        self.label = label
        self.value = value
        self.pct = pct
        self._width = width or 170 * mm

    def wrap(self, availWidth, availHeight):
        self._width = availWidth
        return (self._width, 20)

    def draw(self):
        c = self.canv
        w = self._width
        bar_y = 2
        text_y = 10
        c.setFont("Body", 8.5)
        c.setFillColor(Brand.cafe)
        c.drawString(0, text_y, self.label)
        c.setFont("DataBold", 8.5)
        c.setFillColor(Brand.negro)
        c.drawRightString(w - 35, text_y, str(self.value))
        c.setFont("Data", 7.5)
        c.setFillColor(Brand.pct_color(self.pct))
        c.drawRightString(w, text_y, f"P{self.pct}")
        c.setFillColor(Brand.crema_oscura)
        c.roundRect(0, bar_y, w, 4, 1.5, fill=1, stroke=0)
        c.setFillColor(Brand.pct_color(self.pct))
        bar_w = w * (self.pct / 100)
        c.roundRect(0, bar_y, bar_w, 4, 1.5, fill=1, stroke=0)


class StatBox(Flowable):
    def __init__(self, value, label, accent=False, width=38*mm, height=28*mm):
        super().__init__()
        self._value = value
        self._label = label
        self._accent = accent
        self._width = width
        self._height = height

    def wrap(self, availWidth, availHeight):
        return (self._width, self._height)

    def draw(self):
        c = self.canv
        c.setStrokeColor(Brand.arena)
        c.setLineWidth(0.5)
        c.setFillColor(Brand.blanco)
        c.roundRect(0, 0, self._width, self._height, 2, fill=1, stroke=1)
        c.setFont("DataBold", 15)
        c.setFillColor(Brand.rojo if self._accent else Brand.negro)
        c.drawCentredString(self._width / 2, self._height / 2 + 2, str(self._value))
        c.setFont("BodyItalic", 7)
        c.setFillColor(Brand.tierra)
        c.drawCentredString(self._width / 2, self._height / 2 - 10, self._label)


class FormIndicator(Flowable):
    def __init__(self, results):
        super().__init__()
        self.results = results

    def wrap(self, availWidth, availHeight):
        return (len(self.results) * 18, 16)

    def draw(self):
        c = self.canv
        colors = {"V": Brand.verde, "E": Brand.dorado, "D": Brand.rojo}
        for i, r in enumerate(self.results):
            x = i * 18
            color = colors.get(r, Brand.tierra)
            c.setStrokeColor(color)
            c.setLineWidth(1)
            c.roundRect(x, 0, 14, 14, 1, fill=0, stroke=1)
            c.setFont("BodyBold", 8)
            c.setFillColor(color)
            c.drawCentredString(x + 7, 3.5, r)


class PullquoteBlock(Flowable):
    def __init__(self, text, width=None):
        super().__init__()
        self.text = text
        self._width = width or 170 * mm
        self._lines = []

    def wrap(self, availWidth, availHeight):
        self._width = availWidth
        chars_per_line = int((self._width - 24 * mm) / 5.5)
        self._lines = textwrap.wrap(self.text, width=chars_per_line)
        h = len(self._lines) * 13 + 18 * mm
        return (self._width, h)

    def draw(self):
        c = self.canv
        h = len(self._lines) * 13 + 18 * mm
        c.setFillColor(Brand.negro)
        c.roundRect(0, 0, self._width, h, 3, fill=1, stroke=0)
        c.setFont("BodyItalic", 9.5)
        c.setFillColor(Brand.crema)
        y = h - 10 * mm
        for line in self._lines:
            c.drawString(10 * mm, y, line)
            y -= 13


# ══════════════════════════════════════════════════════════════
# DATA
# ══════════════════════════════════════════════════════════════

DATA = {
    "team": "Argentina",
    "fifa_ranking": 2,
    "confederation": "CONMEBOL",
    "group": "J",
    "system": "4-3-3 / 4-2-3-1",
    "coach": "Lionel Scaloni",
    "coach_age": 47,
    "coach_since": "2018",
    "coach_win_rate": "70.6%",
    "coach_record": "~60W 17E 8L",
    "coach_titles": "WC 2022, CA 2021, CA 2024, Finalissima 2022",
    "wc_history": "18 apariciones, 3 titulos (1978, 1986, 2022), 6 finales",
    "qualifying": {
        "played": 18, "w": 12, "d": 2, "l": 4,
        "gf": 31, "gc": 10, "pts": 38, "pos": "1ro",
    },
    "form": ["V", "V", "E", "V", "D"],
    "stats_defense": [
        ("Goles enc. / partido", "0.56", 91),
        ("Porterias a cero", "66.7%", 93),
        ("GA local / partido", "0.22", 96),
        ("GA visitante / partido", "0.89", 65),
        ("Duelos defensivos ganados", "~54%", 68),
    ],
    "stats_distribution": [
        ("Posesion promedio", "~66%", 88),
        ("Precision de pase", "~87%", 82),
        ("Pases progresivos / p", "~8.5", 78),
        ("Pases al ultimo tercio / p", "~12", 80),
    ],
    "stats_attack": [
        ("Goles / partido", "1.72", 82),
        ("xG / partido (est.)", "~1.65", 80),
        ("Tiros / partido (est.)", "~13.5", 72),
        ("Conversion de gol", "~12.7%", 78),
        ("Goleadores distintos", "12+", 92),
    ],
    "players_top15": [
        {"name": "Lionel Messi", "pos": "RW/SS", "age": 38, "club": "Inter Miami", "ici": 3.85},
        {"name": "Lautaro Martinez", "pos": "ST", "age": 28, "club": "Inter Milan", "ici": 3.52},
        {"name": "Julian Alvarez", "pos": "ST", "age": 26, "club": "Atletico Madrid", "ici": 3.50},
        {"name": "Enzo Fernandez", "pos": "CM", "age": 25, "club": "Chelsea", "ici": 3.40},
        {"name": "Emiliano Martinez", "pos": "GK", "age": 33, "club": "Aston Villa", "ici": 3.22},
        {"name": "Alexis Mac Allister", "pos": "CM", "age": 27, "club": "Liverpool", "ici": 3.18},
        {"name": "Cristian Romero", "pos": "CB", "age": 27, "club": "Tottenham", "ici": 3.10},
        {"name": "Rodrigo De Paul", "pos": "CM", "age": 31, "club": "Inter Miami", "ici": 2.92},
        {"name": "Lisandro Martinez", "pos": "CB", "age": 27, "club": "Manchester Utd", "ici": 2.85},
        {"name": "Nahuel Molina", "pos": "RB", "age": 27, "club": "Atletico Madrid", "ici": 2.72},
        {"name": "Nicolas Gonzalez", "pos": "LW", "age": 27, "club": "Atletico Madrid", "ici": 2.68},
        {"name": "Alejandro Garnacho", "pos": "LW/RW", "age": 21, "club": "Chelsea", "ici": 2.60},
        {"name": "Thiago Almada", "pos": "AM", "age": 24, "club": "Atletico Madrid", "ici": 2.55},
        {"name": "Nicolas Tagliafico", "pos": "LB", "age": 33, "club": "Lyon", "ici": 2.48},
        {"name": "Leandro Paredes", "pos": "CDM", "age": 31, "club": "Boca Juniors", "ici": 2.40},
    ],
    "strengths": [
        ("Madurez competitiva incomparable",
         "Nucleo de 8-9 jugadores con 50+ partidos juntos. Campeon del Mundo 2022, bicampeon de America. No hay contexto que los desestabilice.",
         "70.6% win rate en ~85 partidos, 4 titulos 2021-2024"),
        ("Profundidad ofensiva elite",
         "Messi, Alvarez, Lautaro: tres delanteros top-20 mundial. 12 goleadores distintos en eliminatorias. Garnacho, Almada y Nico Paz desde el banco.",
         "1.72 goles/partido (P82), 12+ goleadores distintos (P92)"),
        ("Solidez defensiva de elite",
         "0.56 GA/partido (P91) con 12 porterias a cero en 18 partidos. Romero-Lisandro de nivel Champions. E. Martinez aporta seguridad.",
         "0.22 GA/partido como local (P96). 66.7% porterias a cero"),
        ("Pressing coordinado e inteligente",
         "No presiona 90 minutos: elige cuando apretar con triggers claros. Recuperaciones en campo rival alimentan transiciones letales.",
         "Pressing selectivo con triggers: pase atras, recepcion de espaldas, lateral en banda"),
    ],
    "weaknesses": [
        ("Vulnerabilidad en partidos de visitante",
         "8W-1E-0L en casa vs 4W-1E-4L de visitante. Las 4 derrotas fueron fuera de casa. Menor agresividad defensiva lejos del Monumental.",
         "Win rate local 88.9% vs visitante 44.4%. 0.22 vs 0.89 GA/partido"),
        ("Transiciones defensivas expuestas",
         "Cuando pierde en campo rival con laterales proyectados, el espacio entre lineas se abre. 3 de 4 derrotas incluyeron goles en transicion.",
         "Espacio a la espalda de Molina (RB) = principal via de ataque"),
        ("Dependencia del mediocampo titular",
         "Caida de nivel significativa sin Enzo y De Paul. Paredes ofrece control pero no la dinamica del doble pivote titular.",
         "Win rate estimado ~80% con ambos vs ~55% sin alguno"),
        ("Gestion fisica de Messi",
         "A los 38, Messi gestiona su carga fisica. Jugo 12 de 18 eliminatorias. En un Mundial con partidos cada 3-4 dias, la dosificacion sera clave.",
         "Messi jugo 12 de 18 partidos de eliminatorias"),
    ],
    "predicted_xi": [
        ("GK", "E. Martinez"),
        ("RB", "N. Molina"), ("CB", "C. Romero"), ("CB", "L. Martinez"), ("LB", "N. Tagliafico"),
        ("CM", "Enzo Fernandez"), ("CM", "R. De Paul"), ("CM", "A. Mac Allister"),
        ("RW", "L. Messi"), ("ST", "J. Alvarez"), ("LW", "N. Gonzalez"),
    ],
    "results": [
        ("1", "7 sep 2023", "Argentina vs Ecuador", "1-0", "L", "V"),
        ("2", "12 sep 2023", "Bolivia vs Argentina", "0-3", "V", "V"),
        ("3", "12 oct 2023", "Argentina vs Paraguay", "1-0", "L", "V"),
        ("4", "17 oct 2023", "Peru vs Argentina", "0-2", "V", "V"),
        ("5", "16 nov 2023", "Uruguay vs Argentina", "2-0", "V", "D"),
        ("6", "21 nov 2023", "Brasil vs Argentina", "0-1", "V", "V"),
        ("7", "5 sep 2024", "Argentina vs Chile", "3-0", "L", "V"),
        ("8", "10 sep 2024", "Colombia vs Argentina", "2-1", "V", "D"),
        ("9", "10 oct 2024", "Venezuela vs Argentina", "1-1", "V", "E"),
        ("10", "15 oct 2024", "Argentina vs Bolivia", "6-0", "L", "V"),
        ("11", "14 nov 2024", "Paraguay vs Argentina", "2-1", "V", "D"),
        ("12", "19 nov 2024", "Argentina vs Peru", "1-0", "L", "V"),
        ("13", "20 mar 2025", "Uruguay vs Argentina", "0-1", "V", "V"),
        ("14", "25 mar 2025", "Argentina vs Brasil", "4-1", "L", "V"),
        ("15", "5 jun 2025", "Chile vs Argentina", "0-1", "V", "V"),
        ("16", "10 jun 2025", "Argentina vs Colombia", "1-1", "L", "E"),
        ("17", "4 sep 2025", "Argentina vs Venezuela", "3-0", "L", "V"),
        ("18", "9 sep 2025", "Ecuador vs Argentina", "1-0", "V", "D"),
    ],
    "scorers": [
        ("Lionel Messi", 8, 12),
        ("Lautaro Martinez", 6, 15),
        ("Julian Alvarez", 5, 16),
        ("Enzo Fernandez", 3, 16),
        ("Otros (9 jugadores)", 9, None),
    ],
    "group_opponents": [
        ("Algeria", "#34", "CAF", "Bloque medio, transiciones rapidas, juego directo. Petkovic DT."),
        ("Austria", "#25", "UEFA", "Pressing alto Rangnick, intensidad fisica extrema, transiciones."),
        ("Jordan", "#62", "AFC", "Bloque bajo, primera vez en un Mundial. Organizacion defensiva."),
    ],
    "group_calendar": [
        ("J1 (16 jun)", "Argentina vs Algeria", "Kansas City"),
        ("J2 (21 jun)", "Argentina vs Austria", "Arlington"),
        ("J3 (27 jun)", "Jordan vs Argentina", "Arlington"),
    ],
    "staff": [
        ("Pablo Aimar", "Asistente tecnico principal"),
        ("Walter Samuel", "Asistente tecnico (defensa)"),
        ("Roberto Ayala", "Asistente tecnico (rivales)"),
        ("Diego Placente", "Asistente / coordinador juveniles"),
        ("Luis Martin", "Preparador fisico"),
    ],
    "squad_gk": [
        ("Emiliano Martinez", 33, "Aston Villa (PL)", "Titular indiscutido. Especialista en penales."),
        ("Geronimo Rulli", 34, "Olympique Marsella", "Suplente con experiencia europea."),
        ("Walter Benitez", 33, "PSG", "Tercer arquero, opcion de emergencia."),
    ],
    "squad_def": [
        ("Cristian Romero", 27, "Tottenham (PL)", "CB", "Capitan Spurs, agresivo, anticipativo."),
        ("Lisandro Martinez", 27, "Manchester Utd (PL)", "CB", "Complemento posicional de Romero."),
        ("Nicolas Otamendi", 37, "Benfica", "CB", "100+ caps, rotacion y liderazgo."),
        ("Nahuel Molina", 27, "Atletico Madrid", "RB", "Lateral proyectivo, llegada al area."),
        ("Gonzalo Montiel", 29, "Sevilla", "RB", "Heroe final 2022, suplente Molina."),
        ("Nicolas Tagliafico", 33, "Lyon", "LB", "Titular consolidado, experiencia."),
        ("Valentin Barco", 21, "Prestamo Francia", "LB", "Joven proyectivo, alternativa."),
        ("Marcos Senesi", 26, "Bournemouth (PL)", "CB", "Recambio central, crecimiento."),
        ("Juan Foyth", 27, "Villarreal", "CB/RB", "Polivalente central o lateral."),
    ],
    "squad_mid": [
        ("Enzo Fernandez", 25, "Chelsea (PL)", "CM", "Box-to-box elite, 8 goles PL."),
        ("Rodrigo De Paul", 31, "Inter Miami", "CM", "Conector esencial, ball-winner."),
        ("Alexis Mac Allister", 27, "Liverpool (PL)", "CM", "Interior izquierdo, llegada."),
        ("Leandro Paredes", 31, "Boca Juniors", "CDM", "Ancla defensiva del plan B."),
        ("Exequiel Palacios", 26, "B. Leverkusen", "CM", "Dinamismo y versatilidad."),
        ("Enzo Barrenechea", 23, "Prestamo", "CM", "Joven de integracion reciente."),
    ],
    "squad_fwd": [
        ("Lionel Messi", 38, "Inter Miami", "RW/SS", "Capitan, 29G+19A MLS 2025 MVP."),
        ("Julian Alvarez", 26, "Atletico Madrid", "ST", "13G+5A all comps 25-26."),
        ("Lautaro Martinez", 28, "Inter Milan", "ST", "18 G+A Serie A 25-26."),
        ("Nicolas Gonzalez", 27, "Atletico Madrid", "LW", "Desborde y repliegue."),
        ("Alejandro Garnacho", 21, "Chelsea", "LW/RW", "Velocidad, desequilibrio 1v1."),
        ("Nico Paz", 21, "Como (Serie A)", "AM/SS", "Mediapunta creativo, proyeccion."),
        ("Thiago Almada", 24, "Atletico Madrid", "AM/LW", "Creatividad y desborde."),
        ("Paulo Dybala", 32, "Roma", "SS/RW", "Veterano, rotacion creativa."),
    ],
}


# ══════════════════════════════════════════════════════════════
# PAGE TEMPLATES
# ══════════════════════════════════════════════════════════════

def cover_page(c, doc):
    width, height = A4
    header_h = height * 0.44
    c.setFillColor(Brand.negro)
    c.rect(0, height - header_h, width, header_h, fill=1, stroke=0)

    # Brand monogram
    mx, my = 25 * mm, height - 18 * mm
    c.setStrokeColor(Brand.arena)
    c.setLineWidth(0.8)
    c.roundRect(mx - 8, my - 5, 16, 16, 1.5, fill=0, stroke=1)
    c.setFont("DisplayItalic", 12)
    c.setFillColor(Brand.crema)
    c.drawCentredString(mx, my, "A")
    c.setFont("Display", 9)
    c.drawString(mx + 14, my, "Soy Analista")

    # Report type
    c.setFont("BodyItalic", 8.5)
    c.setFillColor(Brand.tierra)
    c.drawRightString(width - 25 * mm, height - 16 * mm, "Informe de seleccion  ·  Mundial 2026  ·  Tier 1")

    # Team name
    c.setFont("Display", 42)
    c.setFillColor(Brand.blanco)
    c.drawString(25 * mm, height - 55 * mm, DATA["team"])

    # Subtitle
    c.setFont("BodyItalic", 12)
    c.setFillColor(Brand.tierra)
    c.drawString(25 * mm, height - 66 * mm,
                 f'{DATA["confederation"]}  ·  FIFA #{DATA["fifa_ranking"]}  ·  Grupo {DATA["group"]}')

    # Red accent
    c.setFillColor(Brand.rojo)
    c.rect(25 * mm, height - 74 * mm, 30 * mm, 2.5, fill=1, stroke=0)

    # Quick stats
    stats = [
        (DATA["system"], "Sistema"),
        (DATA["qualifying"]["pos"], "Eliminatorias"),
        (f'{DATA["qualifying"]["gf"]}GF - {DATA["qualifying"]["gc"]}GC', f'{DATA["qualifying"]["played"]} partidos'),
        (DATA["coach_win_rate"], "Win rate Scaloni"),
    ]
    x = 25 * mm
    for val, lab in stats:
        c.setFont("DataBold", 11)
        c.setFillColor(Brand.blanco)
        c.drawString(x, height - 86 * mm, str(val))
        c.setFont("BodyItalic", 7.5)
        c.setFillColor(Brand.tierra)
        c.drawString(x, height - 93 * mm, lab)
        x += 40 * mm

    # Form indicator on cover
    form_colors = {"V": Brand.verde, "E": Brand.dorado, "D": Brand.rojo}
    fx = 25 * mm
    c.setFont("BodyItalic", 7.5)
    c.setFillColor(Brand.tierra)
    c.drawString(fx, height - 106 * mm, "Forma (ult. 5 elim.):")
    fx += 35 * mm
    for r in DATA["form"]:
        color = form_colors.get(r, Brand.tierra)
        c.setStrokeColor(color)
        c.setLineWidth(1)
        c.roundRect(fx, height - 109 * mm, 13, 13, 1, fill=0, stroke=1)
        c.setFont("BodyBold", 8)
        c.setFillColor(color)
        c.drawCentredString(fx + 6.5, height - 106 * mm, r)
        fx += 17

    # Bottom cream section
    c.setFillColor(Brand.crema)
    c.rect(0, 0, width, height - header_h, fill=1, stroke=0)

    # WC history
    y = height - header_h - 18 * mm
    c.setFont("Display", 12)
    c.setFillColor(Brand.negro)
    c.drawString(25 * mm, y, "Historial mundialista")
    c.setFont("BodyItalic", 8.5)
    c.setFillColor(Brand.cafe)
    c.drawString(25 * mm, y - 14, DATA['wc_history'])

    # Palmares
    y -= 30 * mm
    c.setFont("Display", 12)
    c.setFillColor(Brand.negro)
    c.drawString(25 * mm, y, "Palmares reciente")
    titles = [
        ("Copa Mundial 2022", "Campeon"),
        ("Copa America 2024", "Campeon"),
        ("Finalissima 2022", "Campeon"),
        ("Copa America 2021", "Campeon"),
    ]
    ty = y - 14
    for title, result in titles:
        c.setFont("Body", 8.5)
        c.setFillColor(Brand.cafe)
        c.drawString(25 * mm, ty, title)
        c.setFont("DataBold", 8.5)
        c.setFillColor(Brand.rojo)
        c.drawString(80 * mm, ty, result)
        ty -= 12

    # Coach
    y = ty - 10 * mm
    c.setFont("Display", 12)
    c.setFillColor(Brand.negro)
    c.drawString(25 * mm, y, f"DT: {DATA['coach']}")
    c.setFont("BodyItalic", 8.5)
    c.setFillColor(Brand.cafe)
    c.drawString(25 * mm, y - 14,
                 f"Desde {DATA['coach_since']}  ·  {DATA['coach_record']}  ·  Win rate {DATA['coach_win_rate']}")
    c.setFont("BodyItalic", 8)
    c.setFillColor(Brand.tierra)
    c.drawString(25 * mm, y - 26, f"Titulos: {DATA['coach_titles']}")

    # Footer
    c.setFont("BodyItalic", 7)
    c.setFillColor(Brand.tierra)
    c.drawString(25 * mm, 15 * mm, "soyanalista.com  ·  @analistasoy")
    c.drawRightString(width - 25 * mm, 15 * mm, "Fuentes: FBref, Transfermarkt  ·  Marzo 2026")


def header_footer(canvas_obj, doc):
    width, height = A4
    canvas_obj.saveState()
    canvas_obj.setStrokeColor(Brand.negro)
    canvas_obj.setLineWidth(1.5)
    canvas_obj.line(25 * mm, height - 15 * mm, width - 25 * mm, height - 15 * mm)
    canvas_obj.setFont("Display", 8)
    canvas_obj.setFillColor(Brand.negro)
    canvas_obj.drawString(25 * mm, height - 13 * mm, "Soy Analista")
    canvas_obj.setFont("BodyItalic", 7)
    canvas_obj.setFillColor(Brand.tierra)
    canvas_obj.drawRightString(width - 25 * mm, height - 13 * mm,
                                f"{DATA['team']}  ·  Mundial 2026")
    canvas_obj.setStrokeColor(Brand.arena)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(25 * mm, 18 * mm, width - 25 * mm, 18 * mm)
    canvas_obj.setFont("BodyItalic", 7)
    canvas_obj.setFillColor(Brand.tierra)
    canvas_obj.drawString(25 * mm, 14 * mm, "soyanalista.com")
    canvas_obj.drawRightString(width - 25 * mm, 14 * mm, f"{doc.page}")
    canvas_obj.restoreState()


# ══════════════════════════════════════════════════════════════
# BUILDER HELPERS
# ══════════════════════════════════════════════════════════════

def section_header(number, title):
    return [
        Spacer(1, 6 * mm),
        EditorialRule(),
        Spacer(1, 3 * mm),
        Table(
            [[Paragraph(f"{str(number).zfill(2) if isinstance(number, int) else number}", STYLES["section_num"]),
              Paragraph(title, STYLES["h2"])]],
            colWidths=[14 * mm, None],
            style=TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ])
        ),
        Spacer(1, 4 * mm),
    ]


def stat_row(stats_list):
    boxes = []
    for val, label, *rest in stats_list:
        accent = rest[0] if rest else False
        boxes.append(StatBox(val, label, accent=accent))
    t = Table([boxes], colWidths=[40 * mm] * len(boxes),
              style=TableStyle([
                  ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                  ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                  ("LEFTPADDING", (0, 0), (-1, -1), 2),
                  ("RIGHTPADDING", (0, 0), (-1, -1), 2),
              ]))
    return t


def percentile_section(title, metrics):
    elements = [
        Paragraph(f"<b>{title}</b>", STYLES["body"]),
        Spacer(1, 2 * mm),
    ]
    for label, value, pct in metrics:
        elements.append(PercentileBar(label, value, pct))
        elements.append(Spacer(1, 1 * mm))
    return elements


def player_table(players):
    header = [
        Paragraph("<b>#</b>", STYLES["data"]),
        Paragraph("<b>Jugador</b>", STYLES["data"]),
        Paragraph("<b>Pos</b>", STYLES["data"]),
        Paragraph("<b>Club</b>", STYLES["data"]),
        Paragraph("<b>Edad</b>", STYLES["data"]),
        Paragraph("<b>ICI</b>", STYLES["data"]),
    ]
    rows = [header]
    for i, p in enumerate(players, 1):
        rows.append([
            Paragraph(str(i), STYLES["data"]),
            Paragraph(f"<b>{p['name']}</b>", STYLES["body"]),
            Paragraph(p["pos"], STYLES["data"]),
            Paragraph(p["club"], STYLES["small"]),
            Paragraph(str(p["age"]), STYLES["data"]),
            Paragraph(f"<b>{p['ici']}</b>", STYLES["data"]),
        ])
    t = Table(rows, colWidths=[8 * mm, 42 * mm, 14 * mm, 38 * mm, 12 * mm, 14 * mm],
              style=TableStyle([
                  ("LINEBELOW", (0, 0), (-1, 0), 1, Brand.negro),
                  ("LINEBELOW", (0, 1), (-1, -1), 0.5, Brand.arena),
                  ("BACKGROUND", (0, 0), (-1, 0), Brand.crema_oscura),
                  ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                  ("TOPPADDING", (0, 0), (-1, -1), 3),
                  ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                  ("LEFTPADDING", (0, 0), (-1, -1), 3),
                  ("TEXTCOLOR", (-1, 1), (-1, -1), Brand.rojo),
              ]))
    return t


def sw_cards(items, sw_type):
    elements = []
    is_strength = sw_type == "strength"
    color = Brand.verde if is_strength else Brand.rojo
    label = "FORTALEZAS - que respetar" if is_strength else "DEBILIDADES - que explotar"
    elements.append(Paragraph(f'<font color="{color.hexval()}">{label}</font>', ParagraphStyle(
        "SWLabel", fontName="BodyBold", fontSize=9, textColor=color,
        spaceAfter=6, spaceBefore=4,
    )))
    for title, detail, metric in items:
        card_data = [
            [Paragraph(f"<b>{title}</b>", STYLES["h3"])],
            [Paragraph(detail, STYLES["body"])],
            [Paragraph(f'<font color="{color.hexval()}">{metric}</font>', ParagraphStyle(
                "Metric", fontName="Data", fontSize=7.5, textColor=color,
            ))],
        ]
        t = Table(card_data, colWidths=[155 * mm],
                  style=TableStyle([
                      ("BOX", (0, 0), (-1, -1), 0.5, Brand.arena),
                      ("BACKGROUND", (0, 0), (-1, -1), Brand.blanco),
                      ("LEFTPADDING", (0, 0), (-1, -1), 10),
                      ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                      ("TOPPADDING", (0, 0), (0, 0), 7),
                      ("BOTTOMPADDING", (-1, -1), (-1, -1), 7),
                  ]))
        elements.append(t)
        elements.append(Spacer(1, 3 * mm))
    return elements


def build_lineup(players):
    elements = []
    lines = {"Portero": [], "Defensa": [], "Mediocampo": [], "Ataque": []}
    for pos, name in players:
        if pos == "GK": lines["Portero"].append(name)
        elif pos in ("RB", "CB", "LB"): lines["Defensa"].append(name)
        elif pos in ("CM", "DM", "AM"): lines["Mediocampo"].append(name)
        else: lines["Ataque"].append(name)
    for line_name, names in reversed(lines.items()):
        elements.append(Paragraph(
            f'<font name="BodyItalic" size="7.5" color="{Brand.tierra.hexval()}">{line_name.upper()}</font>',
            STYLES["small"]
        ))
        row = "    ".join([f'<b>{n}</b>' for n in names])
        elements.append(Paragraph(row, ParagraphStyle(
            "Lineup", fontName="Body", fontSize=10, leading=14,
            textColor=Brand.negro, spaceAfter=6, alignment=TA_CENTER,
        )))
        elements.append(Spacer(1, 2 * mm))
    return elements


def results_table(results):
    header = [
        Paragraph("<b>#</b>", STYLES["data"]),
        Paragraph("<b>Fecha</b>", STYLES["data"]),
        Paragraph("<b>Partido</b>", STYLES["data"]),
        Paragraph("<b>Res.</b>", STYLES["data"]),
        Paragraph("<b>Cond.</b>", STYLES["data"]),
        Paragraph("<b></b>", STYLES["data"]),
    ]
    rows = [header]
    form_colors_map = {"V": Brand.verde, "E": Brand.dorado, "D": Brand.rojo}
    for jornada, fecha, partido, resultado, condicion, forma in results:
        fc = form_colors_map.get(forma, Brand.tierra)
        cond_text = "L" if condicion == "L" else "V"
        rows.append([
            Paragraph(jornada, STYLES["data"]),
            Paragraph(fecha, STYLES["small"]),
            Paragraph(partido, STYLES["body"]),
            Paragraph(f"<b>{resultado}</b>", STYLES["data"]),
            Paragraph(cond_text, STYLES["data"]),
            Paragraph(f'<font color="{fc.hexval()}"><b>{forma}</b></font>', STYLES["data"]),
        ])
    t = Table(rows, colWidths=[8*mm, 22*mm, 55*mm, 14*mm, 10*mm, 10*mm],
              style=TableStyle([
                  ("LINEBELOW", (0, 0), (-1, 0), 1, Brand.negro),
                  ("LINEBELOW", (0, 1), (-1, -1), 0.3, Brand.arena),
                  ("BACKGROUND", (0, 0), (-1, 0), Brand.crema_oscura),
                  ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                  ("TOPPADDING", (0, 0), (-1, -1), 2),
                  ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                  ("LEFTPADDING", (0, 0), (-1, -1), 2),
              ]))
    return t


def squad_table(players, has_pos=False):
    if has_pos:
        header = [
            Paragraph("<b>Nombre</b>", STYLES["data"]),
            Paragraph("<b>Edad</b>", STYLES["data"]),
            Paragraph("<b>Club</b>", STYLES["data"]),
            Paragraph("<b>Pos</b>", STYLES["data"]),
            Paragraph("<b>Notas</b>", STYLES["data"]),
        ]
        rows = [header]
        for name, age, club, pos, notes in players:
            rows.append([
                Paragraph(f"<b>{name}</b>", STYLES["body"]),
                Paragraph(str(age), STYLES["data"]),
                Paragraph(club, STYLES["small"]),
                Paragraph(pos, STYLES["data"]),
                Paragraph(notes, STYLES["small"]),
            ])
        t = Table(rows, colWidths=[35*mm, 10*mm, 35*mm, 12*mm, 55*mm],
                  style=TableStyle([
                      ("LINEBELOW", (0, 0), (-1, 0), 1, Brand.negro),
                      ("LINEBELOW", (0, 1), (-1, -1), 0.3, Brand.arena),
                      ("BACKGROUND", (0, 0), (-1, 0), Brand.crema_oscura),
                      ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                      ("TOPPADDING", (0, 0), (-1, -1), 2),
                      ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                      ("LEFTPADDING", (0, 0), (-1, -1), 2),
                  ]))
    else:
        header = [
            Paragraph("<b>Nombre</b>", STYLES["data"]),
            Paragraph("<b>Edad</b>", STYLES["data"]),
            Paragraph("<b>Club</b>", STYLES["data"]),
            Paragraph("<b>Notas</b>", STYLES["data"]),
        ]
        rows = [header]
        for name, age, club, notes in players:
            rows.append([
                Paragraph(f"<b>{name}</b>", STYLES["body"]),
                Paragraph(str(age), STYLES["data"]),
                Paragraph(club, STYLES["small"]),
                Paragraph(notes, STYLES["small"]),
            ])
        t = Table(rows, colWidths=[38*mm, 10*mm, 40*mm, 60*mm],
                  style=TableStyle([
                      ("LINEBELOW", (0, 0), (-1, 0), 1, Brand.negro),
                      ("LINEBELOW", (0, 1), (-1, -1), 0.3, Brand.arena),
                      ("BACKGROUND", (0, 0), (-1, 0), Brand.crema_oscura),
                      ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                      ("TOPPADDING", (0, 0), (-1, -1), 2),
                      ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                      ("LEFTPADDING", (0, 0), (-1, -1), 2),
                  ]))
    return t


def key_player_card(name, role_emoji, club, age, ici, pos, profile_text, rival_text,
                    role_bars=None, extra_stats=None):
    """Build a player profile card."""
    elements = []
    elements.append(Spacer(1, 3 * mm))

    # Name header with accent
    elements.append(AccentLine(width=20*mm))
    elements.append(Spacer(1, 2 * mm))
    elements.append(Paragraph(f"<b>{name}</b>  —  {pos}", STYLES["h3"]))

    # Info row
    info = f"<font name='Data' size='8'>{club}  ·  {age} anos  ·  ICI {ici}</font>"
    if extra_stats:
        info += f"<br/><font name='Data' size='7.5' color='{Brand.tierra.hexval()}'>{extra_stats}</font>"
    elements.append(Paragraph(info, STYLES["small"]))
    elements.append(Spacer(1, 2 * mm))

    # Role bars
    if role_bars:
        bar_data = []
        for bar_label, bar_val in role_bars:
            bar_data.append([
                Paragraph(bar_label, STYLES["small"]),
                Paragraph(f"<b>{bar_val}/4</b>", STYLES["data"]),
            ])
        bt = Table(bar_data, colWidths=[35*mm, 15*mm],
                   style=TableStyle([
                       ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                       ("TOPPADDING", (0, 0), (-1, -1), 1),
                       ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                       ("LEFTPADDING", (0, 0), (-1, -1), 0),
                   ]))
        elements.append(bt)
        elements.append(Spacer(1, 2 * mm))

    # Profile
    elements.append(Paragraph(profile_text, STYLES["body"]))

    # Rival key
    elements.append(Paragraph(
        f'<font color="{Brand.rojo.hexval()}"><b>Para el rival:</b></font> {rival_text}',
        STYLES["body"]
    ))
    elements.append(DiamondSeparator())
    return elements


def claves_table():
    claves = [
        ("Presionar alto la salida", "Cuando los centrales dudan con presion, Argentina pierde balones peligrosos"),
        ("Atacar espalda de Molina", "El lateral derecho sube constantemente, el espacio a su espalda es explotable"),
        ("No seguir a Alvarez", "Mantener la linea; seguirlo desordena la defensa rival"),
        ("Anular a Enzo Fernandez", "Sin Enzo, Argentina pierde su orquestador principal"),
        ("Messi: alejarlo del centro", "Empujarlo hacia la banda derecha reduce su angulo de pase y tiro"),
        ("Evitar penales", "E. Martinez en tandas de penales es ventaja Argentina"),
        ("Exigir fisicamente", "Messi a los 38 se desgasta con intensidad sostenida 90 minutos"),
    ]
    rows = []
    for clave, expl in claves:
        rows.append([
            Paragraph(f"<b>{clave}</b>", STYLES["body"]),
            Paragraph(expl, STYLES["small"]),
        ])
    t = Table(rows, colWidths=[50*mm, 108*mm],
              style=TableStyle([
                  ("LINEBELOW", (0, 0), (-1, -1), 0.3, Brand.arena),
                  ("VALIGN", (0, 0), (-1, -1), "TOP"),
                  ("TOPPADDING", (0, 0), (-1, -1), 4),
                  ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                  ("LEFTPADDING", (0, 0), (0, -1), 0),
              ]))
    return t


# ══════════════════════════════════════════════════════════════
# MAIN BUILD
# ══════════════════════════════════════════════════════════════

def generate_report(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        topMargin=22 * mm,
        bottomMargin=22 * mm,
        leftMargin=25 * mm,
        rightMargin=25 * mm,
    )

    story = []

    # ── COVER PAGE ──
    story.append(Spacer(1, 200 * mm))
    story.append(PageBreak())

    # ── SECTION 2: Resumen ejecutivo ──
    story.extend(section_header(2, "Resumen ejecutivo"))
    story.append(Paragraph(
        '<font name="Display" size="22" color="#C13628">A</font>rgentina de Lionel Scaloni llega al Mundial 2026 como campeona defensora y maxima candidata al titulo. Opera en un 4-3-3 flexible que muta al 4-4-2 sin balon y al 4-2-3-1 cuando busca control posicional. Con un 65-68% de posesion promedio <b>(P88 entre selecciones mundialistas)</b>, domina los partidos desde la construccion pausada pero con verticalidad letal cuando detecta espacios a la espalda de la linea rival.',
        STYLES["body"]
    ))
    story.append(Paragraph(
        '<b>Como ataca:</b> La profundidad ofensiva es la principal virtud: Messi (ICI 3.85) sigue siendo el catalizador creativo a los 38 anos, pero Alvarez (ICI 3.50) y Lautaro Martinez (ICI 3.52) diversifican la finalizacion con perfiles complementarios. Generan 1.72 goles/partido en eliminatorias con 31 goles repartidos entre al menos 12 anotadores distintos. El carril derecho con Molina proyectandose y Messi cortando hacia adentro es la via de ataque principal.',
        STYLES["body"]
    ))
    story.append(Paragraph(
        '<b>Como defiende:</b> La mejor defensa de las eliminatorias CONMEBOL en goles reales: 0.56 GA/partido <b>(P91)</b> con 12 porterias a cero en 18 partidos (66.7%). Romero dirige la linea con un perfil agresivo y anticipativo, con Lisandro Martinez como complemento posicional. El mediocampo Enzo-De Paul filtra progresiones rivales con la combinacion mas completa del torneo. En casa fue invulnerable (8V-1E-0D, 2 GA en 9 partidos), pero de visitante mostro grietas: 4 derrotas en 9 partidos.',
        STYLES["body"]
    ))
    story.append(Paragraph(
        '<b>Como presiona:</b> Pressing selectivo con triggers especificos: pases hacia atras del rival, recepciones de espaldas al arco, laterales en banda. No es pressing extremo — es pressing inteligente que elige cuando apretar y cuando replegar.',
        STYLES["body"]
    ))
    story.append(Spacer(1, 3 * mm))
    story.append(PullquoteBlock(
        "Claves: explotar la transicion defensiva cuando Argentina pierde en campo rival. "
        "Neutralizar a Messi alejandolo del centro. Evitar duelos aereos donde Romero domina. "
        "Aprovechar que el plan B en el mediocampo es significativamente inferior al titular."
    ))
    story.append(Spacer(1, 2 * mm))
    story.append(Paragraph(
        "Sample size: 18 partidos eliminatorias CONMEBOL (sep 2023 - sep 2025). Amistosos analizados por separado.",
        STYLES["small"]
    ))

    # ── SECTION 3: Ficha de la seleccion ──
    story.append(PageBreak())
    story.extend(section_header(3, "Ficha de la seleccion"))
    ficha_data = [
        ["Seleccion", "Argentina (AFA)"],
        ["Confederacion", "CONMEBOL"],
        ["Ranking FIFA", "#2 (1873.33 pts, enero 2026)"],
        ["Director tecnico", "Lionel Scaloni (desde agosto 2018)"],
        ["Capitan", "Lionel Messi"],
        ["Sede habitual", "Estadio Monumental, Buenos Aires (84.567)"],
        ["Participaciones WC", "18 (sera la 19a en 2026)"],
        ["Titulos WC", "3 (1978, 1986, 2022)"],
        ["Finales WC", "6 (1930, 1978, 1986, 1990, 2014, 2022)"],
        ["Clasificacion 2026", "1ro Eliminatorias Sudamericanas (38 pts, 18 PJ)"],
    ]
    ficha_rows = []
    for label, val in ficha_data:
        ficha_rows.append([
            Paragraph(f"<b>{label}</b>", STYLES["data"]),
            Paragraph(val, STYLES["body"]),
        ])
    t = Table(ficha_rows, colWidths=[40*mm, 118*mm],
              style=TableStyle([
                  ("LINEBELOW", (0, 0), (-1, -1), 0.3, Brand.arena),
                  ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                  ("TOPPADDING", (0, 0), (-1, -1), 3),
                  ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                  ("LEFTPADDING", (0, 0), (-1, -1), 2),
              ]))
    story.append(t)
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "Argentina es la seleccion mas laureada de Sudamerica en Copas del Mundo y la tercera a nivel global. Su titulo en Qatar 2022 puso fin a 36 anos sin levantar la copa y corono a Messi con 7 goles y 3 asistencias en el torneo.",
        STYLES["body"]
    ))

    # ── SECTION 3B: Contexto de grupo ──
    story.extend(section_header("3B", "Contexto de grupo"))
    story.append(Paragraph("<b>Grupo J — Copa Mundial FIFA 2026</b>", STYLES["h3"]))
    group_rows = [[
        Paragraph("<b>Seleccion</b>", STYLES["data"]),
        Paragraph("<b>FIFA</b>", STYLES["data"]),
        Paragraph("<b>Conf.</b>", STYLES["data"]),
        Paragraph("<b>Perfil tactico</b>", STYLES["data"]),
    ]]
    group_rows.append([
        Paragraph("<b>Argentina</b>", STYLES["body"]),
        Paragraph("#2", STYLES["data"]),
        Paragraph("CONMEBOL", STYLES["data"]),
        Paragraph("4-3-3 flexible, posesion + pressing selectivo", STYLES["small"]),
    ])
    for name, rank, conf, style in DATA["group_opponents"]:
        group_rows.append([
            Paragraph(f"<b>{name}</b>", STYLES["body"]),
            Paragraph(rank, STYLES["data"]),
            Paragraph(conf, STYLES["data"]),
            Paragraph(style, STYLES["small"]),
        ])
    gt = Table(group_rows, colWidths=[30*mm, 14*mm, 18*mm, 95*mm],
               style=TableStyle([
                   ("LINEBELOW", (0, 0), (-1, 0), 1, Brand.negro),
                   ("LINEBELOW", (0, 1), (-1, -1), 0.3, Brand.arena),
                   ("BACKGROUND", (0, 0), (-1, 0), Brand.crema_oscura),
                   ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                   ("TOPPADDING", (0, 0), (-1, -1), 3),
                   ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                   ("LEFTPADDING", (0, 0), (-1, -1), 2),
               ]))
    story.append(gt)
    story.append(Spacer(1, 3 * mm))

    # Calendar
    story.append(Paragraph("<b>Calendario</b>", STYLES["h4"]))
    for jornada, partido, sede in DATA["group_calendar"]:
        story.append(Paragraph(
            f'<font name="Data" size="8">{jornada}</font>  ·  <b>{partido}</b>  ·  <font name="BodyItalic" size="8">{sede}</font>',
            STYLES["body"]
        ))

    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        '<b>Partido clave:</b> Argentina vs Austria (J2). El pressing alto de Rangnick contra la salida de balon argentina sera el duelo tactico mas interesante del grupo.',
        STYLES["body"]
    ))
    story.append(Paragraph(
        '<b>Probabilidad de clasificacion:</b> '
        f'<font name="DataBold" color="{Brand.verde.hexval()}">1ro del grupo (82%)</font>',
        STYLES["body"]
    ))

    # ── SECTION 4: Cuerpo tecnico ──
    story.append(PageBreak())
    story.extend(section_header(4, "Cuerpo tecnico"))
    story.append(Paragraph(f"<b>Entrenador principal: {DATA['coach']}</b>", STYLES["h3"]))
    story.append(Paragraph(
        f"47 anos. Desde agosto 2018 (interino), confirmado noviembre 2018. Registro: {DATA['coach_record']} ({DATA['coach_win_rate']} win rate). Record invicto: 36 partidos consecutivos. Titulos: {DATA['coach_titles']}.",
        STYLES["body"]
    ))
    story.append(Paragraph(
        "Scaloni construyo el ciclo mas exitoso de la historia del futbol argentino sin experiencia previa como DT principal. Su permanencia de casi 8 anos consolido un bloque de 12-14 jugadores con automatismos refinados.",
        STYLES["body"]
    ))

    # Staff table
    story.append(Paragraph("<b>Staff tecnico</b>", STYLES["h4"]))
    staff_rows = []
    for name, role in DATA["staff"]:
        staff_rows.append([
            Paragraph(f"<b>{name}</b>", STYLES["body"]),
            Paragraph(role, STYLES["small"]),
        ])
    st = Table(staff_rows, colWidths=[45*mm, 113*mm],
               style=TableStyle([
                   ("LINEBELOW", (0, 0), (-1, -1), 0.3, Brand.arena),
                   ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                   ("TOPPADDING", (0, 0), (-1, -1), 2),
                   ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                   ("LEFTPADDING", (0, 0), (-1, -1), 0),
               ]))
    story.append(st)
    story.append(Spacer(1, 4 * mm))

    # Filosofia
    story.append(Paragraph("<b>Filosofia tactica</b>", STYLES["h4"]))
    principios = [
        "El jugador esta por encima del sistema. Los roles importan mas que el dibujo tactico.",
        "Posesion con proposito. 65-68% promedio, pero cada secuencia busca progresar.",
        "Pressing selectivo. Elige momentos para activar presion alta, no presiona 90 minutos.",
        "Solidez defensiva innegociable. 0.56 GA/partido refleja compromiso colectivo.",
        "Explotacion de transiciones. Verticalidad inmediata tras recuperacion en campo rival.",
    ]
    for i, p in enumerate(principios, 1):
        story.append(Paragraph(f"<b>{i}.</b> {p}", STYLES["body"]))

    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("<b>Plan B y variantes:</b>", STYLES["h4"]))
    story.append(Paragraph(
        "4-2-3-1 con Paredes (ancla defensiva, control), doble 9 Alvarez+Lautaro (buscar gol), rotacion de extremos (Garnacho, Almada, Nico Paz).",
        STYLES["body"]
    ))

    # ── SECTION 5: Plantilla ──
    story.append(PageBreak())
    story.extend(section_header(5, "Plantilla"))
    story.append(Paragraph("Convocatoria probable de 26 jugadores (proyeccion basada en ultimas convocatorias).", STYLES["small"]))
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("<b>Porteros (3)</b>", STYLES["h4"]))
    story.append(squad_table(DATA["squad_gk"]))
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("<b>Defensores (9)</b>", STYLES["h4"]))
    story.append(squad_table(DATA["squad_def"], has_pos=True))
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("<b>Mediocampistas (6)</b>", STYLES["h4"]))
    story.append(squad_table(DATA["squad_mid"], has_pos=True))
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("<b>Delanteros (8)</b>", STYLES["h4"]))
    story.append(squad_table(DATA["squad_fwd"], has_pos=True))

    # ── SECTION 6: Rendimiento colectivo ──
    story.append(PageBreak())
    story.extend(section_header(6, "Rendimiento colectivo"))
    q = DATA["qualifying"]
    story.append(stat_row([
        (q["pts"], "Puntos elim.", True),
        (f'{q["w"]}-{q["d"]}-{q["l"]}', "V - E - D"),
        (f'+{q["gf"] - q["gc"]}', "Dif. goles"),
        (q["pos"], "Pos. CONMEBOL"),
    ]))
    story.append(Spacer(1, 4 * mm))
    story.append(Table(
        [[Paragraph("Ultimos 5:", STYLES["body_italic"]), FormIndicator(DATA["form"])]],
        colWidths=[25 * mm, None],
        style=TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 0)]),
    ))
    story.append(Spacer(1, 4 * mm))

    # Results table
    story.append(Paragraph("<b>Resultados eliminatorias (18 partidos)</b>", STYLES["h4"]))
    story.append(results_table(DATA["results"]))
    story.append(Spacer(1, 4 * mm))

    # Summary stats
    summary_rows = [
        [Paragraph("<b>Metrica</b>", STYLES["data"]),
         Paragraph("<b>Total</b>", STYLES["data"]),
         Paragraph("<b>Local (9)</b>", STYLES["data"]),
         Paragraph("<b>Visitante (9)</b>", STYLES["data"])],
        [Paragraph("PG-PE-PP", STYLES["data"]), Paragraph("12-2-4", STYLES["data"]),
         Paragraph("8-1-0", STYLES["data"]), Paragraph("4-1-4", STYLES["data"])],
        [Paragraph("Goles a favor", STYLES["data"]), Paragraph("31", STYLES["data"]),
         Paragraph("19", STYLES["data"]), Paragraph("12", STYLES["data"])],
        [Paragraph("GA/partido", STYLES["data"]), Paragraph("0.56", STYLES["data"]),
         Paragraph("0.22", STYLES["data"]), Paragraph("0.89", STYLES["data"])],
        [Paragraph("Porterias a cero", STYLES["data"]), Paragraph("12 (66.7%)", STYLES["data"]),
         Paragraph("7 (77.8%)", STYLES["data"]), Paragraph("5 (55.6%)", STYLES["data"])],
        [Paragraph("Pts/partido", STYLES["data"]), Paragraph("2.11", STYLES["data"]),
         Paragraph("2.78", STYLES["data"]), Paragraph("1.44", STYLES["data"])],
    ]
    sumt = Table(summary_rows, colWidths=[38*mm, 30*mm, 30*mm, 30*mm],
                 style=TableStyle([
                     ("LINEBELOW", (0, 0), (-1, 0), 1, Brand.negro),
                     ("LINEBELOW", (0, 1), (-1, -1), 0.3, Brand.arena),
                     ("BACKGROUND", (0, 0), (-1, 0), Brand.crema_oscura),
                     ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                     ("TOPPADDING", (0, 0), (-1, -1), 2),
                     ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                     ("LEFTPADDING", (0, 0), (-1, -1), 2),
                 ]))
    story.append(sumt)
    story.append(Spacer(1, 4 * mm))

    # Scorers
    story.append(Paragraph("<b>Goleadores en eliminatorias</b>", STYLES["h4"]))
    scorer_rows = [[
        Paragraph("<b>Jugador</b>", STYLES["data"]),
        Paragraph("<b>Goles</b>", STYLES["data"]),
        Paragraph("<b>PJ</b>", STYLES["data"]),
    ]]
    for name, goals, matches in DATA["scorers"]:
        scorer_rows.append([
            Paragraph(f"<b>{name}</b>", STYLES["body"]),
            Paragraph(str(goals), STYLES["data"]),
            Paragraph(str(matches) if matches else "-", STYLES["data"]),
        ])
    sct = Table(scorer_rows, colWidths=[60*mm, 15*mm, 15*mm],
                style=TableStyle([
                    ("LINEBELOW", (0, 0), (-1, 0), 1, Brand.negro),
                    ("LINEBELOW", (0, 1), (-1, -1), 0.3, Brand.arena),
                    ("BACKGROUND", (0, 0), (-1, 0), Brand.crema_oscura),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("TOPPADDING", (0, 0), (-1, -1), 2),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                    ("LEFTPADDING", (0, 0), (-1, -1), 2),
                ]))
    story.append(sct)

    # ── SECTION 7: Dashboard ──
    story.append(PageBreak())
    story.extend(section_header(7, "Dashboard estadistico"))
    story.append(Paragraph(
        "Percentiles calculados contra las 47 selecciones clasificadas al Mundial 2026, basados en eliminatorias continentales.",
        STYLES["small"]
    ))
    story.append(Spacer(1, 3 * mm))

    for title, key in [("Fase defensiva", "stats_defense"),
                       ("Distribucion", "stats_distribution"),
                       ("Fase ofensiva", "stats_attack")]:
        story.extend(percentile_section(title, DATA[key]))
        story.append(DiamondSeparator())
        story.append(Spacer(1, 2 * mm))

    story.append(Paragraph(
        "<b>Lectura global:</b> Perfil de seleccion top-5 mundial en todas las fases. Mayor fortaleza: solidez defensiva (P91). Posesion dominante (P88). Produccion ofensiva diversificada (12+ goleadores = P92). Inconsistencia: disparidad local/visitante en GA.",
        STYLES["body"]
    ))

    # ── SECTIONS 8-12: Modelo de juego ──
    story.append(PageBreak())
    story.extend(section_header(8, "Modelo de juego — Construccion"))
    story.append(Paragraph(
        "Argentina construye desde atras con Romero y Lisandro abiertos (25-30m entre si). Enzo o De Paul baja entre centrales para formar trivote de salida (3v2 ante pressing rival). Laterales (Molina, Tagliafico) proyectan alto generando amplitud.",
        STYLES["body"]
    ))
    story.append(Paragraph(
        "Posesion de ~66% (P88) con dos velocidades: fase paciente (70% del tiempo, circulacion lateral) y fase de activacion (30%, pase vertical que rompe lineas via Messi, Enzo o Mac Allister). E. Martinez participa activamente con pases largos diagonales (+80% precision).",
        STYLES["body"]
    ))

    story.extend(section_header(9, "Modelo de juego — Progresion"))
    story.append(Paragraph(
        "Progresion principal por el centro via triangulo Enzo-De Paul-Mac Allister. Enzo orquesta (8-9 pases progresivos/partido, llegada al area). De Paul conecta (motor incansable, +11 km/partido). Mac Allister alterna interior-mediapunta con llegada.",
        STYLES["body"]
    ))
    story.append(Paragraph(
        "<b>Vias preferidas:</b> Canal central (40%, combinaciones rapidas Enzo-Mac Allister-Messi), canal derecho (35%, Molina proyecta + Messi corta adentro), canal izquierdo (25%, Nico Gonzalez desborde + Tagliafico desdoblamiento).",
        STYLES["body"]
    ))

    story.extend(section_header(10, "Modelo de juego — Finalizacion"))
    story.append(Paragraph(
        "~13.5 tiros/partido (P72), 1.72 goles/partido (P82). Perfil eficiente: no necesita volumen excesivo porque la calidad de sus finalizadores es elite. xG estimado ~1.65/partido — ligero sobrerendimiento (+0.07), consistente con finalizadores de nivel (Messi, Lautaro, Alvarez).",
        STYLES["body"]
    ))
    story.append(Paragraph(
        "<b>Tipos de gol (est.):</b> Juego combinado central (~40%), jugada individual (~20%), transicion rapida (~15%), balon parado (~15%), centro + remate (~10%).",
        STYLES["body"]
    ))

    story.extend(section_header(11, "Modelo de juego — Pressing y defensa"))
    story.append(Paragraph(
        "Bloque medio-alto. Contra rivales inferiores: linea alta a 45-50m, pressing coordinado con triggers. Contra rivales de nivel: bloque medio a 35-40m, transicion defensiva rapida. PPDA estimado ~10-12 (pressing moderado-alto, no extremo).",
        STYLES["body"]
    ))
    story.append(Paragraph(
        "<b>Triggers de presion:</b> pase hacia atras del rival, recepcion de espaldas al arco, lateral en linea de banda, saque de puerta corto.",
        STYLES["body"]
    ))
    story.append(Paragraph(
        "<b>Debilidad identificada:</b> Las 4 derrotas (todas de visitante) incluyeron goles en transiciones tras perdidas en campo rival. Cuando laterales estan proyectados, el espacio entre centrales y laterales se expone.",
        STYLES["body"]
    ))

    story.extend(section_header(12, "Modelo de juego — Transiciones"))
    story.append(Paragraph(
        "<b>Ofensiva:</b> Letal tras recuperacion alta (pase filtrado a Messi/Alvarez en 3-4 seg). Recuperacion media: resetea posesion. E. Martinez tiene pase largo diagonal para saltar lineas.",
        STYLES["body"]
    ))
    story.append(Paragraph(
        "<b>Defensiva (punto mas vulnerable):</b> Pressing post-perdida 6 seg. Si falla, repliegue rapido a bloque medio. Problema: laterales (Molina especialmente) proyectados dejan espacio a la espalda. Las 4 derrotas coinciden con exposicion en este espacio.",
        STYLES["body"]
    ))

    # ── SECTION 13: Balon parado ──
    story.append(PageBreak())
    story.extend(section_header(13, "Acciones a balon parado"))
    story.append(Paragraph(
        "<b>Corners ofensivos:</b> Messi ejecuta con derecha (centros al primer palo con curva interior). Romero es la amenaza aerea principal. Mac Allister/Enzo toman corners con zurda.",
        STYLES["body"]
    ))
    story.append(Paragraph(
        "<b>Tiros libres:</b> Messi ejecutor principal. Colocacion de elite aunque la frecuencia de gol disminuyo con la edad.",
        STYLES["body"]
    ))
    story.append(Paragraph(
        f'<b>Penales:</b> Messi (1er cobrador), Lautaro (2do). <font color="{Brand.rojo.hexval()}">E. Martinez es posiblemente el mejor portero del mundo en tandas de penales</font> — heroe en CA 2021, WC 2022, CA 2024.',
        STYLES["body"]
    ))
    story.append(Paragraph(
        "<b>Defensa ABP:</b> Esquema mixto zonal/al hombre. 3 jugadores en zona + 3-4 marcadores al hombre. Romero defiende primer palo (mejor cabeceador defensivo).",
        STYLES["body"]
    ))

    # ── SECTION 14: Analisis individual ──
    story.extend(section_header(14, "Analisis individual — Rankings ICI"))
    story.append(Paragraph(
        "ICI = Indice de Contribucion Individual (compuesto: 40% seleccion + 60% club). Escala 0-4.",
        STYLES["small"]
    ))
    story.append(Spacer(1, 3 * mm))
    story.append(player_table(DATA["players_top15"]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "<b>Lectura:</b> 11 jugadores con ICI >2.50 (contribuidor alto o elite). Solo Brasil y Francia tienen cifras comparables entre las 48 selecciones.",
        STYLES["body"]
    ))

    # ── SECTION 15: Fichas de jugadores clave ──
    story.append(PageBreak())
    story.extend(section_header(15, "Fichas de jugadores clave"))

    # E. Martinez
    story.extend(key_player_card(
        "Emiliano Martinez", "GK", "Aston Villa (PL)", 33, 3.22, "Portero",
        "Portero moderno con participacion activa en construccion, reflejos excepcionales en 1v1, dominio aereo. Mayor diferencial: factor psicologico en momentos decisivos. Comportamiento disruptivo en penales documentado y legal.",
        "Evitar tanda de penales. Atacar con centros donde debe salir de su linea — excelente en arco pero comprometido en salidas aereas ocasionales.",
        extra_stats="25 PJ PL 25-26, 68 atajadas, 6 porterias a cero"
    ))

    # Romero
    story.extend(key_player_card(
        "Cristian Romero", "CB", "Tottenham (PL)", 27, 3.10, "Central derecho",
        "Central agresivo de anticipacion, disputa en zona alta, duelo aereo dominante. Capitan de Spurs 25-26. Conduce desde atras para romper lineas y atraer presion.",
        "Sale a anticipar con agresividad — el espacio a su espalda es explotable. Tendencia a tarjetas (2 rojas en PL 25-26). Vulnerable a dribblers rapidos que cambian de direccion.",
        role_bars=[("Defensivo", "3.8"), ("Creativo", "0.8"), ("Progresion", "2.9"), ("Finalizacion", "0.4")],
        extra_stats="92.17% precision pase, 1 gol UCL"
    ))

    # Enzo
    story.extend(key_player_card(
        "Enzo Fernandez", "CM", "Chelsea (PL)", 25, 3.40, "Mediocampista central",
        "Corazon del equipo. Orquestador: recibe de espaldas, gira, distribuye. Lidera pases progresivos. Llegada al area con remate de media distancia (8 goles PL 25-26).",
        "Presionarlo cuando recibe de espaldas (forzar error). No darle tiempo para girar. No dejarlo llegar al area — remates desde fuera cada vez mas peligrosos.",
        role_bars=[("Defensivo", "3.2"), ("Creativo", "3.8"), ("Progresion", "3.5"), ("Finalizacion", "2.4")],
        extra_stats="8G+2A PL 25-26"
    ))

    # Alvarez
    story.append(PageBreak())
    story.extend(key_player_card(
        "Julian Alvarez", "ST", "Atletico Madrid", 26, 3.50, "Delantero centro",
        "Delantero mas completo del plantel. Remata de todas posiciones, presiona centrales, conecta bajando al mediocampo. Nunca esta quieto: baja, sube, se mueve lateralmente.",
        "No marcarlo al hombre — arrastra central fuera de posicion. Mantener la linea y no seguirlo a zonas de mediocampo.",
        role_bars=[("Defensivo", "2.8"), ("Creativo", "2.8"), ("Progresion", "3.2"), ("Finalizacion", "3.5")],
        extra_stats="8G+3A LaLiga, 5G+2A UCL (13G+5A total)"
    ))

    # Messi
    story.extend(key_player_card(
        "Lionel Messi", "RW/SS", "Inter Miami", 38, 3.85, "Extremo derecho / Segunda punta",
        "Capitan. A los 38 no presiona ni corre como antes pero sigue siendo el jugador mas peligroso del torneo con balon en el ultimo tercio. Definicion de elite: colocacion, penales, tiro libre. 29G+19A MLS 2025 (MVP). 8 goles en 12 eliminatorias.",
        "No dejarle recibir de frente al arco entre lineas. De espaldas es manejable. De frente con espacio es imparable. Doblar marca (lateral + mediocampista). Alejarlo del centro hacia la banda derecha.",
        role_bars=[("Defensivo", "0.8"), ("Creativo", "3.9"), ("Progresion", "3.0"), ("Finalizacion", "3.8")],
        extra_stats="29G+19A MLS 2025, 8G elim. en 12 PJ"
    ))

    # De Paul
    story.extend(key_player_card(
        "Rodrigo De Paul", "CM", "Inter Miami", 31, 2.92, "Mediocampista central",
        "Nexo emocional y tactico. Ball-winner agresivo, motor incansable (+11 km/partido). Cuando esta, el equipo tiene cohesion y distancias cortas entre lineas.",
        "Exigirlo fisicamente (31 anos, MLS). Explotar tendencia a acumular tarjetas por juego fuerte. Sin el, Argentina pierde cohesion en el mediocampo.",
        role_bars=[("Defensivo", "3.5"), ("Creativo", "2.5"), ("Progresion", "2.8"), ("Finalizacion", "0.8")]
    ))

    # Mac Allister
    story.extend(key_player_card(
        "Alexis Mac Allister", "CM", "Liverpool (PL)", 27, 3.18, "Interior izquierdo",
        "Alterna posiciones de mediocampo profundo y mediapunta. Movimiento constante. En Liverpool perfecciono llegada (3 goles UCL 25-26).",
        "Dificil de marcar por movimiento constante. No perderlo en transicion — cuando aparece en el area con espacio, es letal.",
        role_bars=[("Defensivo", "2.5"), ("Creativo", "3.2"), ("Progresion", "3.0"), ("Finalizacion", "2.2")],
        extra_stats="2G+2A PL, 3G UCL 25-26"
    ))

    # Suplentes de impacto
    story.append(PageBreak())
    story.append(Paragraph("<b>Suplentes de impacto</b>", STYLES["h3"]))
    story.append(Spacer(1, 2 * mm))

    subs = [
        ("Lautaro Martinez (ST, 28, Inter Milan) — ICI 3.52",
         "Goleador que entra a definir. 14 goles Serie A 25-26. Puede jugar junto a Alvarez o reemplazarlo. Gol en final CA 2024 en prorroga."),
        ("Alejandro Garnacho (LW/RW, 21, Chelsea) — ICI 2.60",
         "Revulsivo electrico. Velocidad, desborde, audacia. Puede jugar por ambas bandas."),
        ("Leandro Paredes (CDM, 31, Boca Juniors) — ICI 2.40",
         "Ancla del Plan B. Pivote defensivo con pase largo que cambia el eje del juego."),
    ]
    for title, desc in subs:
        story.append(Paragraph(f"<b>{title}</b>", STYLES["body"]))
        story.append(Paragraph(desc, STYLES["body_italic"]))
        story.append(Spacer(1, 2 * mm))

    # ── SECTION 16: Fortalezas, debilidades y claves ──
    story.extend(section_header(16, "Fortalezas, debilidades y claves"))
    story.extend(sw_cards(DATA["strengths"], "strength"))
    story.append(DiamondSeparator())
    story.append(Spacer(1, 3 * mm))
    story.extend(sw_cards(DATA["weaknesses"], "weakness"))
    story.append(Spacer(1, 4 * mm))

    # Claves
    story.append(Paragraph(
        f'<font color="{Brand.rojo.hexval()}"><b>CLAVES PARA ENFRENTAR A ARGENTINA</b></font>',
        ParagraphStyle("ClavesLabel", fontName="BodyBold", fontSize=9,
                       textColor=Brand.rojo, spaceAfter=6)
    ))
    story.append(claves_table())

    # ── SECTION 17: XI probable ──
    story.append(PageBreak())
    story.extend(section_header(17, "XI probable y recomendaciones"))
    story.append(Paragraph(
        f"<b>{DATA['system']}</b> — Formacion mas utilizada en eliminatorias (estimado 14 de 18 partidos)",
        STYLES["body_italic"]
    ))
    story.append(Spacer(1, 4 * mm))
    story.extend(build_lineup(DATA["predicted_xi"]))

    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("<b>Alternativas tacticas</b>", STYLES["h4"]))
    story.append(Paragraph(
        "<b>4-2-3-1</b> (vs pressing alto, ej: Austria): Paredes + Enzo como doble pivote, Messi libre detras de Alvarez.",
        STYLES["body"]
    ))
    story.append(Paragraph(
        "<b>4-4-2 / Doble 9</b> (buscar el gol): Alvarez + Lautaro arriba, Messi detras, Nico Gonzalez y un interior por las bandas.",
        STYLES["body"]
    ))

    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("<b>Recomendaciones para el cuerpo tecnico rival</b>", STYLES["h4"]))
    recos = [
        "Formacion: 5-3-2 o 5-4-1 con bloque medio-bajo. No competir en posesion.",
        "Pressing selectivo: activar solo cuando centrales argentinos tienen 2v2 en la salida.",
        "Transiciones: principal via de gol. Salir rapido hacia espalda de Molina/Tagliafico.",
        "Marca a Messi: doble marca en zona 14. Empujarlo a la banda derecha. No hacer faltas cerca del area.",
        "Balon parado: oportunidad real. Centros al segundo palo donde Lisandro Martinez (1.75m) defiende.",
        "Gestion: mantenerse en el partido 60 min. Si Argentina no resuelve temprano, la ansiedad puede aparecer.",
    ]
    for i, r in enumerate(recos, 1):
        story.append(Paragraph(f"<b>{i}.</b> {r}", STYLES["body"]))

    # ── FINAL FOOTER ──
    story.append(Spacer(1, 8 * mm))
    story.append(DiamondSeparator())
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "Informe elaborado por Soy Analista. Datos: FBref, Transfermarkt, FIFA, CONMEBOL. Actualizados al 3 de marzo de 2026.",
        STYLES["caption"]
    ))
    story.append(Paragraph(
        "Los percentiles son estimaciones basadas en datos publicos de eliminatorias continentales. Los ICI compuestos combinan rendimiento con seleccion (40%) y club (60%).",
        STYLES["caption"]
    ))

    # ── BUILD ──
    doc.build(
        story,
        onFirstPage=cover_page,
        onLaterPages=header_footer,
    )
    print(f"PDF generado: {output_path}")


if __name__ == "__main__":
    output = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                          "informe_argentina_mundial2026.pdf")
    generate_report(output)
