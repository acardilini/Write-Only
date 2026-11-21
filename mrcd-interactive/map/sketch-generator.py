"""Generate the MRCD base-map thumbnail sheet (three structures + a key) as one SVG."""
import sys

INK = "#262626"
SOFT = "#555555"
FAINT = "#8a8a8a"
FONT = "Helvetica Neue, Helvetica, Arial, sans-serif"


def smooth(pts):
    """Catmull-Rom through pts -> SVG path d."""
    d = f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"
    for i in range(len(pts) - 1):
        p0 = pts[i - 1] if i > 0 else pts[i]
        p1, p2 = pts[i], pts[i + 1]
        p3 = pts[i + 2] if i + 2 < len(pts) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C {c1[0]:.1f} {c1[1]:.1f}, {c2[0]:.1f} {c2[1]:.1f}, {p2[0]:.1f} {p2[1]:.1f}"
    return d


class Panel:
    def __init__(self, x, y, w, h, title, sub):
        self.x, self.y, self.w, self.h = x, y, w, h
        self.out = []
        self.text(24, 36, title, 18, INK, weight=600)
        self.text(24, 58, sub, 13, SOFT)

    def add(self, s):
        self.out.append(s)

    def text(self, x, y, s, size=12, fill=SOFT, anchor="start", weight=400, italic=False, caps=False):
        style = f"font-family:{FONT};font-size:{size}px;fill:{fill};font-weight:{weight}"
        if italic:
            style += ";font-style:italic"
        if caps:
            style += ";letter-spacing:1.2px"
            s = s.upper()
        self.add(f'<text x="{x}" y="{y}" text-anchor="{anchor}" style="{style}">{s}</text>')

    def walk(self, pts):
        self.add(f'<path d="{smooth(pts)}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')

    def trail(self, pts):
        self.add(f'<path d="{smooth(pts)}" fill="none" stroke="{INK}" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="0 7"/>')

    def leave(self, pts):
        self.add(f'<path d="{smooth(pts)}" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="6 6"/>')

    def route(self, pts):
        self.add(f'<path d="{smooth(pts)}" fill="none" stroke="{INK}" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="12 9"/>')

    def side(self, pts):
        self.add(f'<path d="{smooth(pts)}" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" stroke-dasharray="7 6"/>')

    def line(self, pts, width=1.4, color=INK):
        self.add(f'<path d="{smooth(pts)}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>')

    def hill(self, x, y, w, h):
        self.add(f'<path d="M{x-w/2} {y} Q{x} {y-h*2} {x+w/2} {y}" fill="none" stroke="{INK}" stroke-width="1.4" stroke-linecap="round"/>')

    def grove(self, x, y, n=7, spread=46):
        import math
        for i in range(n):
            a = i * 2.39996
            r = spread * math.sqrt((i + 0.5) / n)
            self.icon("tree", round(x + r * math.cos(a)), round(y + r * math.sin(a) * 0.55))

    def bridge(self, x, y0, y1):
        self.add(f'<path d="M{x-11} {y0-6} Q{x-15} {(y0+y1)/2} {x-11} {y1+6} M{x+11} {y0-6} Q{x+15} {(y0+y1)/2} {x+11} {y1+6}" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>')

    def mech(self, p, label, side="r"):
        x, y = p
        self.add(f'<circle cx="{x}" cy="{y}" r="4" fill="{INK}"/>')
        off = {"r": (9, 4, "start"), "l": (-9, 4, "end"), "t": (0, -10, "middle"), "b": (0, 18, "middle")}[side]
        self.text(x + off[0], y + off[1], label, 12, SOFT, off[2])

    def stop(self, p, name, trig, lx, ly, anchor="start"):
        x, y = p
        self.add(f'<circle cx="{x}" cy="{y}" r="7" fill="#ffffff" stroke="{INK}" stroke-width="2.4"/>')
        self.text(lx, ly, name, 14, INK, anchor, weight=600)
        if trig:
            self.text(lx, ly + 15, trig, 10, FAINT, anchor, caps=True)

    def ring(self, p, label, lx, ly, anchor="start"):
        x, y = p
        self.add(f'<circle cx="{x}" cy="{y}" r="9" fill="#ffffff" stroke="{INK}" stroke-width="1.8"/>')
        self.add(f'<circle cx="{x}" cy="{y}" r="3" fill="{INK}"/>')
        self.text(lx, ly, label, 12, INK, anchor, italic=True)

    def flag(self, p, filled, label=None, lx=None, ly=None, anchor="start"):
        x, y = p
        fill = INK if filled else "#ffffff"
        self.add(f'<path d="M{x} {y} V{y-26}" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
        self.add(f'<path d="M{x} {y-26} L{x+16} {y-20} L{x} {y-14} Z" fill="{fill}" stroke="{INK}" stroke-width="1.6" stroke-linejoin="round"/>')
        if label:
            self.text(lx, ly, label, 11, SOFT, anchor, italic=True)

    def icon(self, kind, x, y):
        s = f'fill="none" stroke="{INK}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"'
        if kind == "house":
            self.add(f'<path d="M{x-9} {y+8} V{y-1} L{x} {y-9} L{x+9} {y-1} V{y+8} Z M{x-2} {y+8} V{y+2} H{x+2} V{y+8}" {s}/>')
        elif kind == "smoke":
            self.add(f'<path d="M{x-9} {y+8} V{y-1} L{x} {y-9} L{x+9} {y-1} V{y+8} Z M{x+4} {y-5} V{y-12} H{x+7} V{y-2} M{x+6} {y-15} c 4 -3 -3 -5 1 -9" {s}/>')
        elif kind == "shop":
            self.add(f'<path d="M{x-10} {y+8} V{y-3} H{x+10} V{y+8} Z M{x-12} {y-3} L{x-9} {y-10} H{x+9} L{x+12} {y-3} M{x-4} {y+8} V{y+2} H{x+4} V{y+8}" {s}/>')
        elif kind == "stall":
            self.add(f'<path d="M{x-12} {y-4} Q{x} {y-15} {x+12} {y-4} Z M{x} {y-4} V{y+8} M{x-10} {y+2} H{x+10} M{x-8} {y+2} V{y+8} M{x+8} {y+2} V{y+8}" {s}/>')
        elif kind == "tree":
            self.add(f'<path d="M{x} {y+8} V{y+2} M{x-6} {y+3} L{x} {y-10} L{x+6} {y+3} Z" {s}/>')
        elif kind == "bird":
            self.add(f'<path d="M{x-6} {y} q 3 -4 6 0 q 3 -4 6 0" {s}/>')
        elif kind == "grass":
            self.add(f'<path d="M{x-5} {y} l -1 -5 M{x} {y} v -6 M{x+5} {y} l 1 -5" {s}/>')

    def svg(self):
        frame = f'<rect x="0" y="0" width="{self.w}" height="{self.h}" fill="#ffffff" stroke="#dddddd"/>'
        return f'<g transform="translate({self.x},{self.y})">{frame}{"".join(self.out)}</g>'


def detours(p):
    p.icon("bird", 640, 110); p.icon("bird", 662, 100); p.icon("tree", 60, 210); p.icon("tree", 76, 204)
    p.walk([(50, 330), (120, 316), (200, 300), (290, 334), (390, 360), (490, 334), (590, 300), (650, 296), (720, 300)])
    p.icon("house", 50, 306); p.text(50, 360, "Home", 13, INK, "middle", 600)
    # Vegan stall: prevention loop and a justification loop above the walk
    p.trail([(142, 313), (108, 268), (128, 228), (172, 220), (204, 252), (201, 292)])
    p.mech((108, 268), "Perceived change", "l"); p.mech((128, 228), "Avoidance", "l"); p.mech((172, 220), "Derogation", "t")
    p.trail([(199, 292), (214, 240), (255, 175)])
    p.trail([(255, 175), (300, 168), (325, 215), (326, 262), (312, 300), (300, 330)])
    p.mech((325, 215), "Denying mind"); p.mech((326, 262), "Normal"); p.mech((312, 300), "Necessary")
    p.ring((255, 175), "discomfort", 241, 179, "end")
    p.leave([(255, 165), (250, 135), (256, 106)]); p.flag((256, 106), True, "change", 276, 92)
    p.icon("stall", 200, 326); p.stop((200, 300), "Vegan stall", "vegans nearby", 184, 330, "end")
    # Butcher: loops below the walk
    p.trail([(330, 345), (318, 392), (340, 430), (385, 440), (405, 405), (393, 368)])
    p.mech((318, 392), "Avoidance", "l"); p.mech((340, 430), "Wilful ignorance", "l"); p.mech((385, 440), "Dissociation", "b")
    p.trail([(396, 368), (425, 420), (470, 470)])
    p.trail([(470, 470), (512, 478), (536, 440), (538, 395), (520, 340)])
    p.mech((536, 440), "Humane meat"); p.mech((538, 395), "Natural"); p.mech((512, 478), "Nice", "b")
    p.ring((470, 470), "discomfort", 456, 474, "end")
    p.leave([(470, 480), (464, 512), (470, 548)]); p.flag((470, 548), True, "change", 490, 540)
    p.icon("shop", 390, 334); p.stop((390, 360), "Butcher", None, 410, 326)
    p.text(410, 311, "the animal", 10, FAINT, caps=True)
    # Smokehouse: loops above the walk
    p.trail([(532, 316), (505, 268), (528, 236), (566, 236), (592, 262), (594, 292)])
    p.mech((505, 268), "Perceived change", "l")
    p.trail([(597, 292), (612, 240), (652, 175)])
    p.trail([(652, 175), (694, 170), (716, 212), (714, 250), (700, 278), (682, 298)])
    p.mech((716, 212), "Nice", "l"); p.mech((714, 250), "Normal", "l"); p.mech((700, 278), "Necessary", "l")
    p.ring((652, 175), "discomfort", 638, 179, "end")
    p.leave([(652, 165), (646, 135), (652, 106)]); p.flag((652, 106), True, "change", 672, 92)
    p.icon("smoke", 590, 326); p.stop((590, 300), "Smokehouse", "eating meat", 608, 330)
    p.flag((720, 300), False)


def shared(p):
    p.icon("bird", 690, 70); p.icon("bird", 712, 62); p.icon("grass", 300, 560); p.icon("grass", 470, 566)
    p.walk([(50, 512), (200, 478), (300, 506), (400, 512), (500, 486), (600, 478), (720, 506)])
    p.icon("house", 50, 488); p.text(50, 540, "Home", 13, INK, "middle", 600)
    # prevention: the long way round, a path beside the walk
    p.trail([(68, 504), (95, 430), (150, 404), (260, 402), (330, 412), (460, 402), (505, 410), (615, 402), (680, 420), (692, 452), (704, 496)])
    p.text(104, 372, "the long way round", 11, FAINT, "start", italic=True)
    p.mech((150, 404), "Avoidance", "b"); p.mech((300, 409), "Wilful ignorance", "b")
    p.mech((460, 402), "Dissociation", "t"); p.mech((505, 410), "Perceived change", "b")
    p.mech((615, 402), "Humane meat", "t"); p.mech((692, 452), "Derogation", "l")
    # spurs from each stop up to one shared point of discomfort
    p.trail([(200, 470), (240, 400), (372, 346)])
    p.trail([(400, 504), (392, 420), (381, 348)])
    p.trail([(600, 470), (540, 400), (388, 346)])
    p.trail([(380, 344), (380, 280)])
    p.ring((380, 270), "discomfort", 394, 300)
    # justifications loop away and come back to the long way round
    p.trail([(372, 266), (320, 230), (250, 212), (180, 230), (140, 300), (128, 400)])
    p.mech((250, 212), "Denying mind", "t"); p.mech((180, 230), "Dichotomisation", "l")
    p.trail([(380, 260), (392, 190), (440, 140), (520, 122), (600, 150), (652, 230), (664, 400)])
    p.mech((440, 140), "Natural", "t"); p.mech((520, 122), "Normal", "t"); p.mech((600, 150), "Nice", "r")
    p.trail([(390, 272), (460, 260), (525, 250), (565, 282), (572, 330), (560, 404)])
    p.mech((460, 260), "Necessary", "b"); p.mech((525, 250), "Third-party blame", "t"); p.mech((572, 330), "Moral outrage", "l")
    # change leaves the map
    p.leave([(372, 262), (330, 170), (240, 118), (140, 100), (80, 104)]); p.flag((80, 104), True, "change", 100, 92)
    p.icon("stall", 200, 452); p.stop((200, 478), "Vegan stall", "vegans nearby", 200, 536, "middle")
    p.icon("shop", 400, 488); p.stop((400, 512), "Butcher", "the animal", 400, 540, "middle")
    p.icon("smoke", 600, 452); p.stop((600, 478), "Smokehouse", "eating meat", 600, 536, "middle")
    p.flag((720, 506), False)


def loop(p):
    p.icon("tree", 40, 120); p.icon("tree", 56, 114); p.icon("bird", 700, 470); p.icon("bird", 718, 462)
    loop_pts = [(380, 530), (220, 508), (100, 420), (90, 320), (130, 205), (250, 128), (380, 112),
                (520, 128), (630, 205), (670, 320), (640, 430), (530, 508), (380, 530)]
    p.walk(loop_pts)
    # prevention: keep walking round the loop
    p.mech((220, 508), "Avoidance", "b"); p.mech((100, 420), "Wilful ignorance", "l")
    p.mech((130, 205), "Dissociation", "l"); p.mech((250, 128), "Humane meat", "t")
    p.mech((520, 128), "Derogation", "t"); p.mech((630, 205), "Perceived change", "r")
    # spurs inward to discomfort
    p.trail([(98, 320), (230, 312), (366, 320)])
    p.trail([(380, 120), (372, 220), (380, 306)])
    p.trail([(662, 320), (530, 330), (394, 320)])
    p.ring((380, 320), "discomfort", 366, 302, "end")
    # justifications curl back out to the loop
    p.trail([(370, 330), (310, 362), (262, 400), (246, 452), (236, 510)])
    p.mech((310, 362), "Denying mind", "l"); p.mech((262, 400), "Dichotomisation", "l")
    p.trail([(380, 334), (384, 378), (368, 430), (378, 478), (380, 528)])
    p.mech((384, 378), "Natural"); p.mech((368, 430), "Normal"); p.mech((378, 478), "Nice")
    p.trail([(390, 330), (452, 362), (500, 410), (512, 462), (526, 510)])
    p.mech((452, 362), "Necessary"); p.mech((500, 410), "Third-party blame"); p.mech((512, 462), "Moral outrage")
    # change leaves the loop
    p.leave([(390, 312), (470, 250), (580, 160), (650, 104), (690, 84)]); p.flag((690, 84), True, "change", 712, 74)
    p.icon("stall", 90, 296); p.stop((90, 320), "Vegan stall", "vegans nearby", 106, 348)
    p.icon("shop", 380, 88); p.stop((380, 112), "Butcher", None, 396, 92)
    p.text(396, 77, "the animal", 10, FAINT, caps=True)
    p.icon("smoke", 670, 296); p.stop((670, 320), "Smokehouse", "eating meat", 656, 352, "end")
    p.icon("house", 380, 556); p.text(400, 566, "Home, and round again", 12, INK, "start", 600)


def trailmap(p):
    # the river: discomfort is a crossing
    up = [(0, 342), (250, 322), (520, 352), (800, 326), (1080, 346), (1340, 322), (1560, 338)]
    p.line(up); p.line([(x, y + 40) for x, y in up])
    p.text(24, 410, "the river: discomfort", 11, FAINT, italic=True)
    # the hills: justifications, paths that branch and join
    for x, y, w, h in [(200, 300, 170, 42), (820, 312, 170, 36), (1470, 300, 170, 52)]:
        p.hill(x, y, w, h)
    p.text(24, 150, "the hills: justifications", 11, FAINT, italic=True)
    p.icon("bird", 700, 110); p.icon("bird", 722, 102); p.icon("bird", 1340, 210)
    # the woods beside the walk: prevention keeps things out of sight
    p.grove(250, 462, 7, 50); p.grove(640, 470, 8, 56); p.grove(1226, 476, 7, 46)
    p.text(24, 436, "the woods: out of sight", 11, FAINT, italic=True)
    # the walk
    p.route([(60, 560), (200, 548), (330, 540), (520, 572), (720, 565), (900, 548), (1100, 540), (1300, 552), (1480, 560)])
    p.icon("house", 60, 536); p.text(60, 592, "Home", 13, INK, "middle", 600)
    # prevention loops into each grove, back to the walk
    p.side([(296, 545), (240, 512), (196, 470), (220, 430), (288, 436), (322, 478), (334, 534)])
    p.mech((196, 470), "Avoidance", "l"); p.mech((220, 430), "Derogation", "t"); p.mech((240, 512), "Perceived change", "l")
    p.side([(600, 571), (560, 520), (584, 456), (650, 436), (700, 470), (690, 566)])
    p.mech((560, 520), "Avoidance", "l"); p.mech((584, 456), "Wilful ignorance", "l"); p.mech((650, 436), "Dissociation", "t")
    p.side([(1150, 541), (1168, 496), (1214, 444), (1268, 462), (1286, 510), (1292, 550)])
    p.mech((1214, 444), "Humane meat", "t"); p.mech((1286, 510), "Perceived change", "r")
    # paths up to the bridges: the butcher's path joins the stall's
    p.side([(338, 532), (392, 460), (414, 386)])
    p.side([(720, 557), (764, 480), (724, 410), (600, 396), (428, 384)])
    p.side([(1100, 532), (1030, 466), (1004, 382)])
    p.bridge(420, 346, 382); p.ring((420, 362), "discomfort", 446, 412)
    p.bridge(1000, 340, 376); p.ring((1000, 356), "discomfort", 980, 412, "end")
    # over the hills: three ways of justifying, branching and joining
    p.side([(420, 352), (372, 280), (330, 222), (400, 178), (500, 196), (580, 228), (640, 250)])
    p.mech((330, 222), "Denying mind", "l"); p.mech((500, 196), "Dichotomisation", "t")
    p.side([(430, 350), (520, 302), (580, 276), (640, 250), (760, 214), (880, 232), (948, 236)])
    p.mech((580, 276), "Natural", "b"); p.mech((760, 214), "Normal", "t"); p.mech((880, 232), "Nice", "b")
    p.side([(1000, 346), (952, 280), (948, 236), (1000, 190), (1050, 184), (1110, 196), (1146, 220), (1176, 250), (1250, 300), (1300, 340)])
    p.mech((1000, 190), "Necessary", "l"); p.mech((1110, 196), "Third-party blame", "t"); p.mech((1176, 250), "Moral outrage", "r")
    # back over the river to the walk: the same as before
    p.bridge(1300, 328, 364)
    p.side([(1300, 368), (1400, 440), (1420, 556)])
    p.flag((1480, 560), False, "same as before", 1480, 592, "end")
    # change: a path over the hills that doesn't come back
    p.leave([(1146, 220), (1230, 160), (1310, 112), (1400, 96)]); p.flag((1400, 96), True, "change", 1422, 84)
    p.icon("stall", 330, 516); p.stop((330, 540), "Vegan stall", "vegans nearby", 330, 598, "middle")
    p.icon("shop", 720, 541); p.stop((720, 565), "Butcher", "the animal", 790, 590)
    p.icon("smoke", 1100, 516); p.stop((1100, 540), "Smokehouse", "eating meat", 1100, 598, "middle")

def key(p):
    rows = [
        ("walk", "The walk"),
        ("trail", "A path off the walk that comes back to it (prevention, justification)"),
        ("leave", "A path that leaves and doesn't come back (change)"),
        ("mech", "A mechanism, sitting on its path"),
        ("stop", "A place on the walk, with what it can set off"),
        ("ring", "Discomfort: where a path turns"),
        ("flag0", "The end: the same as before"),
        ("flag1", "The end: something changes"),
    ]
    y = 110
    for kind, label in rows:
        if kind == "walk":
            p.walk([(40, y), (80, y - 8), (120, y)])
        elif kind == "trail":
            p.trail([(40, y), (80, y - 8), (120, y)])
        elif kind == "leave":
            p.leave([(40, y), (80, y - 8), (120, y)])
        elif kind == "mech":
            p.add(f'<circle cx="80" cy="{y-4}" r="4" fill="{INK}"/>')
        elif kind == "stop":
            p.add(f'<circle cx="80" cy="{y-4}" r="7" fill="#ffffff" stroke="{INK}" stroke-width="2.4"/>')
        elif kind == "ring":
            p.add(f'<circle cx="80" cy="{y-4}" r="9" fill="#ffffff" stroke="{INK}" stroke-width="1.8"/><circle cx="80" cy="{y-4}" r="3" fill="{INK}"/>')
        elif kind == "flag0":
            p.flag((76, y + 8), False)
        elif kind == "flag1":
            p.flag((76, y + 8), True)
        p.text(150, y, label, 13, INK)
        y += 46
    for i, kind in enumerate(["house", "shop", "smoke", "stall", "tree", "bird", "grass"]):
        p.icon(kind, 60 + i * 44, 500)
    p.text(40, 540, "Pictograms: one ink, one weight, used sparingly", 13, SOFT)
    p.text(40, 470, "Black and white on purpose. Your own route will be added on top in one colour.", 13, SOFT)


def main(out):
    W, H = 1640, 2020
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">',
             f'<rect width="{W}" height="{H}" fill="#f4f4f2"/>',
             f'<text x="40" y="58" style="font-family:{FONT};font-size:26px;font-weight:600;fill:{INK}">Base map, first sketches: four ways to lay out the model</text>']
    panels = [
        (Panel(40, 100, 760, 580, "1 · Detours at each stop", "Each place has its own small loops off the walk. Mechanisms can repeat."), detours),
        (Panel(840, 100, 760, 580, "2 · One shared map", "Every stop leads into the same model; each mechanism appears once."), shared),
        (Panel(40, 720, 760, 580, "3 · The loop", "The walk is a loop. Justifications lead back to it; change leaves it."), loop),
        (Panel(840, 720, 760, 580, "Key", "One visual grammar, shared by all four sketches"), key),
        (Panel(40, 1340, 1560, 640, "4 · A trail through a landscape", "After your fourth reference: woods, a river and hills stand for the parts of the model. Paths branch and join."), trailmap),
    ]
    for panel, fn in panels:
        fn(panel)
        parts.append(panel.svg())
    parts.append("</svg>")
    open(out, "w").write("\n".join(parts))


if __name__ == "__main__":
    main(sys.argv[1])
