import { getRole } from './../services/auth';

export default {
    itens: [
        { can: ['administrator', 'manager'], name: 'Dashboard', icon: 'dashboard', url: '/' + getRole() + '/dashboard' },
        { can: ['administrator', 'manager'], name: 'Pedidos', icon: 'solution', url: '/orders' },
        { can: ['administrator', 'manager'], name: 'Caixa', icon: 'dollar', url: '/cashiers' },
        { can: ['administrator', 'manager'], name: 'Produtos', icon: 'appstore', url: '/products' },
        { can: ['administrator', 'manager'], name: 'Relatórios', icon: 'fund', url: '/reports' },
    ]
}