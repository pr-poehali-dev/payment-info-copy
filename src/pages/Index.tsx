import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    title: 'Зарплата',
    amount: 125000,
    date: '2025-10-28',
    status: 'completed',
    category: 'Доход'
  },
  {
    id: '2',
    type: 'expense',
    title: 'Оплата интернета',
    amount: 890,
    date: '2025-10-27',
    status: 'completed',
    category: 'Услуги'
  },
  {
    id: '3',
    type: 'expense',
    title: 'Продукты',
    amount: 3450,
    date: '2025-10-26',
    status: 'completed',
    category: 'Покупки'
  },
  {
    id: '4',
    type: 'income',
    title: 'Фриланс',
    amount: 45000,
    date: '2025-10-25',
    status: 'pending',
    category: 'Доход'
  },
  {
    id: '5',
    type: 'expense',
    title: 'Кафе',
    amount: 1200,
    date: '2025-10-24',
    status: 'completed',
    category: 'Развлечения'
  }
];

const statements = [
  { id: '1', month: 'Октябрь 2025', size: '2.4 МБ', date: '2025-10-29' },
  { id: '2', month: 'Сентябрь 2025', size: '2.1 МБ', date: '2025-09-30' },
  { id: '3', month: 'Август 2025', size: '1.9 МБ', date: '2025-08-31' }
];

const faqItems = [
  {
    question: 'Как долго обрабатываются платежи?',
    answer: 'Большинство платежей обрабатываются мгновенно. Переводы между счетами занимают до 1 минуты, а переводы в другие банки — до 3 рабочих дней.'
  },
  {
    question: 'Какие комиссии взимаются за переводы?',
    answer: 'Переводы внутри системы бесплатны. За переводы в другие банки комиссия составляет 0.5% от суммы, минимум 50 рублей.'
  },
  {
    question: 'Как получить выписку по счету?',
    answer: 'Выписки формируются автоматически в конце каждого месяца и доступны в разделе "Выписки". Вы также можете запросить выписку за любой период через поддержку.'
  },
  {
    question: 'Что делать, если платёж завис?',
    answer: 'Если платёж не завершился в течение 30 минут, обратитесь в службу поддержки с номером транзакции. Мы проверим статус и решим проблему в течение 24 часов.'
  },
  {
    question: 'Можно ли отменить платёж?',
    answer: 'Завершённые платежи отменить нельзя. Если платёж находится в статусе "В обработке", вы можете запросить отмену через поддержку в течение 1 часа.'
  }
];

const Index = () => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const balance = 287650;
  const income = mockTransactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = mockTransactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredTransactions = mockTransactions.filter(t => 
    filter === 'all' ? true : t.type === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'pending': return 'В обработке';
      case 'failed': return 'Ошибка';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-gradient">PayInfo</h1>
          <p className="text-muted-foreground text-lg">Управляйте финансами легко и удобно</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-gradient border-2 border-gradient-purple/30 hover-scale animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="Wallet" size={18} />
                Общий баланс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-gradient animate-pulse">
                {balance.toLocaleString('ru-RU')} ₽
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gradient-blue/30 hover-scale animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="TrendingUp" size={18} />
                Доходы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                +{income.toLocaleString('ru-RU')} ₽
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gradient-pink/30 hover-scale animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="TrendingDown" size={18} />
                Расходы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">
                -{expense.toLocaleString('ru-RU')} ₽
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="transactions" className="data-[state=active]:bg-gradient-purple data-[state=active]:text-white">
              <Icon name="Receipt" size={18} className="mr-2" />
              Транзакции
            </TabsTrigger>
            <TabsTrigger value="statements" className="data-[state=active]:bg-gradient-blue data-[state=active]:text-white">
              <Icon name="FileText" size={18} className="mr-2" />
              Выписки
            </TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-gradient-pink data-[state=active]:text-white">
              <Icon name="HelpCircle" size={18} className="mr-2" />
              Вопросы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4 animate-fade-in">
            <div className="flex gap-2 mb-4">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-gradient-purple' : ''}
              >
                Все
              </Button>
              <Button
                variant={filter === 'income' ? 'default' : 'outline'}
                onClick={() => setFilter('income')}
                className={filter === 'income' ? 'bg-gradient-blue' : ''}
              >
                Доходы
              </Button>
              <Button
                variant={filter === 'expense' ? 'default' : 'outline'}
                onClick={() => setFilter('expense')}
                className={filter === 'expense' ? 'bg-gradient-pink' : ''}
              >
                Расходы
              </Button>
            </div>

            <div className="space-y-3">
              {filteredTransactions.map((transaction, index) => (
                <Card 
                  key={transaction.id} 
                  className="hover-scale border-2 border-muted/50 animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        transaction.type === 'income' 
                          ? 'bg-green-500/20' 
                          : 'bg-red-500/20'
                      }`}>
                        <Icon 
                          name={transaction.type === 'income' ? 'ArrowDownLeft' : 'ArrowUpRight'} 
                          size={24}
                          className={transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{transaction.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="Calendar" size={14} />
                          {new Date(transaction.date).toLocaleDateString('ru-RU')}
                          <span>•</span>
                          <span>{transaction.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={getStatusColor(transaction.status)}>
                        {getStatusText(transaction.status)}
                      </Badge>
                      <div className={`text-2xl font-bold ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {transaction.amount.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statements" className="space-y-4 animate-fade-in">
            <Card className="border-2 border-gradient-blue/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Ежемесячные выписки
                </CardTitle>
                <CardDescription>
                  Загрузите детальные отчёты по всем операциям за месяц
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {statements.map((statement, index) => (
                  <Card 
                    key={statement.id} 
                    className="hover-scale animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gradient-blue/20">
                          <Icon name="Download" size={24} className="text-gradient-blue" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{statement.month}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Icon name="File" size={14} />
                            PDF • {statement.size}
                            <span>•</span>
                            <Icon name="Calendar" size={14} />
                            {new Date(statement.date).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-gradient-purple to-gradient-blue hover:opacity-90">
                        <Icon name="Download" size={18} className="mr-2" />
                        Скачать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="animate-fade-in">
            <Card className="border-2 border-gradient-pink/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="HelpCircle" size={24} />
                  Часто задаваемые вопросы
                </CardTitle>
                <CardDescription>
                  Ответы на популярные вопросы о платежах и транзакциях
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-lg hover:text-gradient-purple">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
