<template>
  <span v-if="code" class="flag-icon" :title="code">
    <img :src="flagUrl" :alt="code" height="24" style="vertical-align:middle; border-radius:3px; box-shadow:0 1px 2px #0001;" />
  </span>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  code: {
    type: String,
    required: true,
  },
})
// Utilitza flagsapi.com que accepta només ISO2
const flagUrl = computed(() => {
  // Si el codi és ISO3, converteix a ISO2 per als més comuns
  const iso3to2 = {
    ESP: 'ES', FRA: 'FR', DEU: 'DE', USA: 'US', UKR: 'UA', RUS: 'RU', ITA: 'IT', PRT: 'PT', BRA: 'BR', ARG: 'AR', MEX: 'MX', CHN: 'CN', JPN: 'JP', IND: 'IN', TUR: 'TR', GBR: 'GB', CAN: 'CA', AUS: 'AU', MAR: 'MA', NGA: 'NG', ZAF: 'ZA', EGY: 'EG', IRN: 'IR', ISR: 'IL', SAU: 'SA', KOR: 'KR', POL: 'PL', SWE: 'SE', CHE: 'CH', NLD: 'NL', BEL: 'BE', GRC: 'GR', HUN: 'HU', CZE: 'CZ', ROU: 'RO', SRB: 'RS', HRV: 'HR', SVK: 'SK', SVN: 'SI', BGR: 'BG', DNK: 'DK', FIN: 'FI', NOR: 'NO', AUT: 'AT', IRL: 'IE', EST: 'EE', LVA: 'LV', LTU: 'LT', BLR: 'BY', MDA: 'MD', GEO: 'GE', KAZ: 'KZ', ARM: 'AM', AZE: 'AZ', UZB: 'UZ', TKM: 'TM', KGZ: 'KG', TJK: 'TJ', MNG: 'MN', AFG: 'AF', PAK: 'PK', BGD: 'BD', NPL: 'NP', LKA: 'LK', THA: 'TH', VNM: 'VN', KHM: 'KH', LAO: 'LA', MMR: 'MM', MYS: 'MY', SGP: 'SG', IDN: 'ID', PHL: 'PH', NZL: 'NZ', CHL: 'CL', COL: 'CO', PER: 'PE', VEN: 'VE', ECU: 'EC', BOL: 'BO', PRY: 'PY', URY: 'UY', CUB: 'CU', DOM: 'DO', HND: 'HN', SLV: 'SV', GTM: 'GT', NIC: 'NI', CRI: 'CR', PAN: 'PA', JAM: 'JM', TTO: 'TT', HTI: 'HT', BHS: 'BS', GRD: 'GD', BRB: 'BB', ATG: 'AG', DMA: 'DM', KNA: 'KN', LCA: 'LC', VCT: 'VC', SUR: 'SR', GUY: 'GY', GUF: 'GF', GLP: 'GP', MTQ: 'MQ', REU: 'RE', PYF: 'PF', NCL: 'NC', WLF: 'WF', NFK: 'NF', COK: 'CK', NIU: 'NU', TKL: 'TK', TON: 'TO', TUV: 'TV', VUT: 'VU', FJI: 'FJ', SLB: 'SB', PNG: 'PG', PLW: 'PW', NRU: 'NR', KIR: 'KI', FSM: 'FM', MHL: 'MH', CMR: 'CM', CIV: 'CI', GHA: 'GH', SEN: 'SN', MLI: 'ML', BFA: 'BF', NER: 'NE', TCD: 'TD', SDN: 'SD', SSD: 'SS', ETH: 'ET', SOM: 'SO', KEN: 'KE', UGA: 'UG', RWA: 'RW', BDI: 'BI', TZA: 'TZ', MOZ: 'MZ', ZMB: 'ZM', ZWE: 'ZW', BWA: 'BW', NAM: 'NA', AGO: 'AO', COD: 'CD', COG: 'CG', GAB: 'GA', GNQ: 'GQ', STP: 'ST', GN: 'GN', SLE: 'SL', LBR: 'LR', GMB: 'GM', SEN: 'SN', MRT: 'MR', CPV: 'CV', GNB: 'GW', SWZ: 'SZ', LSO: 'LS', COM: 'KM', SYC: 'SC', MDG: 'MG', MUS: 'MU', DJI: 'DJ', ERI: 'ER', TUN: 'TN', DZA: 'DZ', LBY: 'LY', MRT: 'MR', WSA: 'EH', JOR: 'JO', LBN: 'LB', SYR: 'SY', IRQ: 'IQ', KWT: 'KW', QAT: 'QA', BHR: 'BH', ARE: 'AE', OMN: 'OM', YEM: 'YE', PSE: 'PS', JOR: 'JO', LBN: 'LB', SYR: 'SY', IRQ: 'IQ', KWT: 'KW', QAT: 'QA', BHR: 'BH', ARE: 'AE', OMN: 'OM', YEM: 'YE', PSE: 'PS', JOR: 'JO', LBN: 'LB', SYR: 'SY', IRQ: 'IQ', KWT: 'KW', QAT: 'QA', BHR: 'BH', ARE: 'AE', OMN: 'OM', YEM: 'YE', PSE: 'PS', JOR: 'JO', LBN: 'LB', SYR: 'SY', IRQ: 'IQ', KWT: 'KW', QAT: 'QA', BHR: 'BH', ARE: 'AE', OMN: 'OM', YEM: 'YE', PSE: 'PS'
  }
  let code = props.code.toUpperCase()
  if (code.length === 3 && iso3to2[code]) code = iso3to2[code]
  if (code.length > 2) code = code.slice(0, 2)
  return `https://flagsapi.com/${code}/flat/32.png`
})
</script>

<style scoped>
.flag-icon {
  display: inline-block;
  margin-right: 0.2em;
}
</style>
