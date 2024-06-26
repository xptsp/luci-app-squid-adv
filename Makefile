# Copyright (C) 2023 Douglas Orend
#
# This is free software, licensed under the BSD 2-Clause License
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=Better LuCI support for Squid
LUCI_DEPENDS:=+squid +luci-base +lua-cjson
LUCI_PKGARCH:=all
PKG_NAME:=luci-app-squid-adv
PKG_VERSION:=1.0.1
PKG_RELEASE:=1

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
