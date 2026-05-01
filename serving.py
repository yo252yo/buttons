import os

from flask import Blueprint, send_from_directory

buttons_bp = Blueprint("buttons", __name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


@buttons_bp.route("/buttons")
def index():
    return send_from_directory(BASE_DIR, "index.html")


@buttons_bp.route("/buttons/<path:filename>")
def buttons_static(filename):
    return send_from_directory(BASE_DIR, filename)


@buttons_bp.route("/css/<path:filename>")
def css_static(filename):
    return send_from_directory(os.path.join(BASE_DIR, "css"), filename)


@buttons_bp.route("/js/<path:filename>")
def js_static(filename):
    return send_from_directory(os.path.join(BASE_DIR, "js"), filename)