import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  category: string;
}

interface Card {
  id: string;
  number: string;
  balance: number;
  type: 'debit' | 'credit';
  color: string;
}

const mockCards: Card[] = [
  { id: '1', number: '**** 4829', balance: 287650, type: 'debit', color: 'from-gradient-purple to-gradient-pink' },
  { id: '2', number: '**** 7312', balance: 125000, type: 'credit', color: 'from-gradient-blue to-gradient-purple' }
];

const mockTransactions: Transaction[] = [
  { id: '1', type: 'expense', title: 'Пятёрочка', amount: 3450, date: '2025-10-29', category: 'Продукты' },
  { id: '2', type: 'expense', title: 'Яндекс.Такси', amount: 450, date: '2025-10-28', category: 'Транспорт' },
  { id: '3', type: 'income', title: 'Зарплата', amount: 125000, date: '2025-10-28', category: 'Доход' },
  { id: '4', type: 'expense', title: 'МТС', amount: 890, date: '2025-10-27', category: 'Связь' },
  { id: '5', type: 'expense', title: 'Кофе', amount: 280, date: '2025-10-26', category: 'Кафе' }
];

const categoryData = [
  { name: 'Продукты', amount: 18500, percent: 35, color: 'bg-gradient-purple' },
  { name: 'Транспорт', amount: 8200, percent: 15, color: 'bg-gradient-blue' },
  { name: 'Развлечения', amount: 12000, percent: 23, color: 'bg-gradient-pink' },
  { name: 'Связь', amount: 3890, percent: 7, color: 'bg-gradient-orange' },
  { name: 'Прочее', amount: 10410, percent: 20, color: 'bg-muted' }
];

const loans = [
  { id: '1', name: 'Потребительский кредит', rate: '12.5%', amount: 500000, term: '24 мес' },
  { id: '2', name: 'Автокредит', rate: '15.9%', amount: 1500000, term: '60 мес' },
  { id: '3', name: 'Ипотека', rate: '8.5%', amount: 3000000, term: '180 мес' }
];

const deposits = [
  { id: '1', name: 'Накопительный', rate: '7.5%', amount: 100000, income: 7500, term: '12 мес' },
  { id: '2', name: 'Пополняемый', rate: '6.8%', amount: 250000, income: 17000, term: '18 мес' }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCard] = useState(mockCards[0]);

  const totalBalance = mockCards.reduce((sum, card) => sum + card.balance, 0);
  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gradient">МойБанк</h1>
            <p className="text-muted-foreground text-sm">Добрый день, Александр</p>
          </div>
          <Button variant="ghost" size="icon" className="hover-scale">
            <Icon name="Bell" size={24} />
          </Button>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${selectedCard.color} text-white hover-scale animate-scale-in`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Основная карта</p>
                    <p className="text-2xl font-mono font-bold">{selectedCard.number}</p>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {selectedCard.type === 'debit' ? 'Дебетовая' : 'Кредитная'}
                  </Badge>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">Баланс</p>
                  <p className="text-4xl font-bold">{selectedCard.balance.toLocaleString('ru-RU')} ₽</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: 'Send', label: 'Перевод', tab: 'transfer' },
                  { icon: 'Smartphone', label: 'Телефон', tab: 'payments' },
                  { icon: 'QrCode', label: 'QR-код', tab: 'payments' },
                  { icon: 'MoreHorizontal', label: 'Ещё', tab: 'payments' }
                ].map((action, index) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="flex-col h-auto py-4 hover-scale animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setActiveTab(action.tab)}
                  >
                    <Icon name={action.icon as any} size={24} className="mb-2 text-gradient-purple" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Card className="border-2 border-muted/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Clock" size={20} />
                  Последние операции
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTransactions.slice(0, 5).map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-2 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        <Icon
                          name={transaction.type === 'income' ? 'ArrowDownLeft' : 'ArrowUpRight'}
                          size={18}
                          className={transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.title}</p>
                        <p className="text-xs text-muted-foreground">{transaction.category}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {transaction.amount.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfer" className="space-y-6 animate-fade-in">
            <Card className="border-2 border-gradient-purple/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Send" size={24} />
                  Перевод
                </CardTitle>
                <CardDescription>Переведите деньги на карту или счёт</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Номер карты получателя</Label>
                  <Input
                    id="card-number"
                    placeholder="0000 0000 0000 0000"
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Сумма</Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0"
                      className="text-2xl font-bold pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">₽</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий (необязательно)</Label>
                  <Input id="comment" placeholder="За обед" />
                </div>
                <Button className="w-full bg-gradient-to-r from-gradient-purple to-gradient-pink text-lg py-6">
                  <Icon name="Send" size={20} className="mr-2" />
                  Перевести
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Частые получатели</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Мария К.', 'Иван П.', 'Анна С.'].map((name, index) => (
                  <Button
                    key={name}
                    variant="outline"
                    className="w-full justify-start hover-scale animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-blue to-gradient-purple flex items-center justify-center mr-3">
                      <span className="text-white font-bold">{name[0]}</span>
                    </div>
                    {name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6 animate-fade-in">
            <Card className="border-2 border-gradient-blue/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Smartphone" size={24} />
                  Пополнение телефона
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Номер телефона</Label>
                  <Input placeholder="+7 (___) ___-__-__" className="text-lg" />
                </div>
                <div className="space-y-2">
                  <Label>Сумма</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[100, 300, 500].map((amount) => (
                      <Button key={amount} variant="outline" className="hover-scale">
                        {amount} ₽
                      </Button>
                    ))}
                  </div>
                </div>
                <Button className="w-full bg-gradient-blue text-lg py-6">
                  Пополнить
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-muted/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Zap" size={20} />
                  Другие платежи
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {[
                  { icon: 'Home', label: 'ЖКХ' },
                  { icon: 'Car', label: 'Штрафы' },
                  { icon: 'Wifi', label: 'Интернет' },
                  { icon: 'ShoppingCart', label: 'Покупки' }
                ].map((service, index) => (
                  <Button
                    key={service.label}
                    variant="outline"
                    className="flex-col h-24 hover-scale animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon name={service.icon as any} size={28} className="mb-2 text-gradient-blue" />
                    <span className="text-sm">{service.label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 animate-fade-in">
            <Card className="border-2 border-gradient-pink/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="PieChart" size={24} />
                  Расходы по категориям
                </CardTitle>
                <CardDescription>За текущий месяц: {totalExpenses.toLocaleString('ru-RU')} ₽</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={category.name} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{category.amount.toLocaleString('ru-RU')} ₽</p>
                        <p className="text-xs text-muted-foreground">{category.percent}%</p>
                      </div>
                    </div>
                    <Progress value={category.percent} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6 animate-fade-in">
            <Card className="border-2 border-gradient-purple/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} />
                  Вклады
                </CardTitle>
                <CardDescription>Доступные депозитные программы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {deposits.map((deposit, index) => (
                  <Card key={deposit.id} className="hover-scale animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-lg">{deposit.name}</p>
                          <p className="text-sm text-muted-foreground">{deposit.term}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {deposit.rate}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Сумма вклада</p>
                          <p className="font-bold">{deposit.amount.toLocaleString('ru-RU')} ₽</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Доход</p>
                          <p className="font-bold text-green-400">+{deposit.income.toLocaleString('ru-RU')} ₽</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-gradient-blue/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" size={24} />
                  Кредиты
                </CardTitle>
                <CardDescription>Кредитные программы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {loans.map((loan, index) => (
                  <Card key={loan.id} className="hover-scale animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-lg">{loan.name}</p>
                          <p className="text-sm text-muted-foreground">{loan.term}</p>
                        </div>
                        <Badge variant="outline" className="border-gradient-blue/30">
                          от {loan.rate}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">До {loan.amount.toLocaleString('ru-RU')} ₽</p>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        Оформить
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
            <div className="container mx-auto px-4 max-w-md">
              <div className="grid grid-cols-5 gap-1 py-2">
                {[
                  { icon: 'Home', label: 'Главная', value: 'home' },
                  { icon: 'Send', label: 'Перевод', value: 'transfer' },
                  { icon: 'Smartphone', label: 'Платежи', value: 'payments' },
                  { icon: 'PieChart', label: 'Аналитика', value: 'analytics' },
                  { icon: 'Wallet', label: 'Продукты', value: 'products' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setActiveTab(item.value)}
                    className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${
                      activeTab === item.value ? 'text-gradient-purple' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon name={item.icon as any} size={22} />
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
